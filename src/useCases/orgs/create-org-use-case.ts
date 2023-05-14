import { hash } from 'bcryptjs';

import { Org } from '@prisma/client';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
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
}

export class CreateOrgUseCase {
	constructor(private orgRepository: IOrgRepository, private addressRepository: IAddressRepository) {}

	async execute({ name, owner, email, password, phone, rua, numero, bairro, complemento, cep, cidade, estado }: ICreateOrgUseCaseRequest): Promise<ICreateOrgUseCaseResponse> {
		const orgEmailAlreadyExists = await this.orgRepository.findByEmail(email);
		const orgAddressAlreadyExists = await this.addressRepository.findByCep(cep);

		if (orgEmailAlreadyExists) {
			throw new UserAlreadyExistsError();
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

		return {
			org,
		};
	}
}
