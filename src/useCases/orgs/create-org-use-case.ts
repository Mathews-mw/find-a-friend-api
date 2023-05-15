import { hash } from 'bcryptjs';
import { Address, Org } from '@prisma/client';

import { OrgAlreadyExistsError } from '../errors/org-already-exisist-error';
import { IOrgRepository } from '@/repositories/implementations/IOrgRepository';
import { IAddressRepository } from '@/repositories/implementations/IAddressRepository';
import { AddressAlreadyRegisteredError } from '../errors/address-already-registered-error';

interface ICreateOrgUseCaseRequest {
	name: string;
	owner: string;
	email: string;
	password: string;
	phone: string;
	rua: string;
	numero: string;
	bairro: string;
	complemento?: string;
	cep: string;
	cidade: string;
	estado: string;
}

interface ICreateOrgUseCaseResponse {
	org: Org;
	address: Address;
}

export class CreateOrgUseCase {
	constructor(
		private orgRepository: IOrgRepository,
		private addressRepository: IAddressRepository
	) {}

	async execute({
		name,
		owner,
		email,
		password,
		phone,
		rua,
		numero,
		bairro,
		complemento,
		cep,
		cidade,
		estado,
	}: ICreateOrgUseCaseRequest): Promise<ICreateOrgUseCaseResponse> {
		const orgEmailAlreadyExists = await this.orgRepository.findByEmail(email);
		const orgAddressAlreadyExists = await this.addressRepository.findByCep(cep);

		if (orgEmailAlreadyExists) {
			throw new OrgAlreadyExistsError();
		}

		if (orgAddressAlreadyExists && orgAddressAlreadyExists.numero === numero) {
			throw new AddressAlreadyRegisteredError();
		}

		const passwordHash = await hash(password, 6);

		const org = await this.orgRepository.create({
			name,
			owner,
			email,
			password: passwordHash,
			phone,
		});

		const address = await this.addressRepository.create({
			rua,
			numero,
			bairro,
			complemento,
			CEP: cep,
			cidade,
			estado,
		});

		return {
			org,
			address,
		};
	}
}
