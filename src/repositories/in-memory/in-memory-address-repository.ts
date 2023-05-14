import { randomUUID } from 'node:crypto';
import { Prisma, Address } from '@prisma/client';
import { IAddressRepository } from '../implementations/IAddressRepository';

export class InMemoryAddressRepository implements IAddressRepository {
	private addresses: Address[] = [];

	async create(data: Prisma.AddressUncheckedCreateInput) {
		const newAddress = {
			id: randomUUID(),
			rua: data.rua,
			numero: data.numero,
			bairro: data.bairro,
			complemento: data.complemento ?? null,
			CEP: data.CEP,
			cidade: data.cidade,
			estado: data.estado,
		};

		this.addresses.push(newAddress);

		return newAddress;
	}

	async index() {
		return this.addresses;
	}

	async findById(id: string) {
		const org = this.addresses.find((org) => org.id === id);

		if (!org) {
			return null;
		}

		return org;
	}

	async findByCep(cep: string) {
		const address = this.addresses.find((address) => address.CEP === cep);

		if (!address) {
			return null;
		}

		return address;
	}

	async searchMany(query: string, page: number) {
		const addresses = this.addresses.filter((address) => address.cidade.toLowerCase().includes(query.toLowerCase()) || address.estado.toLocaleLowerCase().includes(query.toLowerCase()));

		return addresses.slice((page - 1) * 20, page * 20);
	}
}
