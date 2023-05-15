import { describe, beforeEach, it, expect } from 'vitest';

import { CreateOrgUseCase } from '@/useCases/orgs/create-org-use-case';
import { OrgAlreadyExistsError } from '@/useCases/errors/org-already-exisist-error';
import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InMemoryAddressRepository } from '@/repositories/in-memory/in-memory-address-repository';
import { AddressAlreadyRegisteredError } from '@/useCases/errors/address-already-registered-error';
import { InMemoryOrgAddressRepository } from '@/repositories/in-memory/in-memory-org-address-repoository';

let createOrgUseCase: CreateOrgUseCase;
let orgRepository: InMemoryOrgRepository;
let userRepository: InMemoryUserRepository;
let addressRepository: InMemoryAddressRepository;
let orgAddressRepository: InMemoryOrgAddressRepository;

describe('Create Org Use Case', () => {
	beforeEach(() => {
		orgRepository = new InMemoryOrgRepository();
		userRepository = new InMemoryUserRepository();
		addressRepository = new InMemoryAddressRepository();
		orgAddressRepository = new InMemoryOrgAddressRepository();
		createOrgUseCase = new CreateOrgUseCase(orgRepository, addressRepository);
	});

	it('Should be able to create a new org', async () => {
		const user = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@emailexample.com',
			password: 'abc742',
			phone: '99999999999',
		});

		const { org, address } = await createOrgUseCase.execute({
			name: 'Pet Adopter',
			owner: user.name,
			email: 'pet.adopter@example.com',
			password: 'abc123',
			phone: '92988889999',
			rua: 'Av. Tancredo Neves',
			numero: '2077',
			bairro: 'Flores',
			cep: '69058120',
			cidade: 'Manaus',
			estado: 'AM',
		});

		const result = await orgAddressRepository.create({
			org_id: org.id,
			address_id: address.id,
		});

		expect(org.id).toEqual(expect.any(String));
		expect(org.owner).toEqual('John Doe');
		expect(address.id).toEqual(expect.any(String));
		expect(result.id).toEqual(expect.any(String));
	});

	it('It should not be possible to register an Org with same address', async () => {
		const user = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@emailexample.com',
			password: 'abc742',
			phone: '99999999999',
		});

		const { org, address } = await createOrgUseCase.execute({
			name: 'Pet Adopter',
			owner: user.name,
			email: 'pet.adopter@example.com',
			password: 'abc123',
			phone: '92988889999',
			rua: 'Av. Tancredo Neves',
			numero: '2077',
			bairro: 'Flores',
			cep: '69058120',
			cidade: 'Manaus',
			estado: 'AM',
		});

		await orgAddressRepository.create({
			org_id: org.id,
			address_id: address.id,
		});

		await expect(() =>
			createOrgUseCase.execute({
				name: 'Pet Adopter II',
				owner: user.name,
				email: 'pet.adopter_another@example.com',
				password: 'abc123',
				phone: '92988889999',
				rua: 'Av. Tancredo Neves',
				numero: '2077',
				bairro: 'Flores',
				cep: '69058120',
				cidade: 'Manaus',
				estado: 'AM',
			})
		).rejects.toBeInstanceOf(AddressAlreadyRegisteredError);
	});

	it('It should not be possible to register them same Org twice', async () => {
		const user = await userRepository.create({
			name: 'John Doe',
			email: 'john.doe@emailexample.com',
			password: 'abc742',
			phone: '99999999999',
		});

		const { org, address } = await createOrgUseCase.execute({
			name: 'Pet Adopter',
			owner: user.name,
			email: 'pet.adopter@example.com',
			password: 'abc123',
			phone: '92988889999',
			rua: 'Av. Tancredo Neves',
			numero: '2077',
			bairro: 'Flores',
			cep: '69058120',
			cidade: 'Manaus',
			estado: 'AM',
		});

		await orgAddressRepository.create({
			org_id: org.id,
			address_id: address.id,
		});

		await expect(() =>
			createOrgUseCase.execute({
				name: 'Pet Adopter',
				owner: user.name,
				email: 'pet.adopter@example.com',
				password: 'abc123',
				phone: '92988889999',
				rua: 'Av. Tancredo Neves',
				numero: '2077',
				bairro: 'Flores',
				cep: '69058120',
				cidade: 'Manaus',
				estado: 'AM',
			})
		).rejects.toBeInstanceOf(OrgAlreadyExistsError);
	});
});
