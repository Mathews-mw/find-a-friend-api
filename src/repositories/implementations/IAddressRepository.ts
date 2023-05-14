import { Address, Prisma } from '@prisma/client';

export interface IAddressRepository {
	create(data: Prisma.AddressUncheckedCreateInput): Promise<Address>;
	index(): Promise<Address[]>;
	findById(id: string): Promise<Address | null>;
	findByCep(cep: string): Promise<Address | null>;
	searchMany(query: string, page: number): Promise<Address[]>;
}
