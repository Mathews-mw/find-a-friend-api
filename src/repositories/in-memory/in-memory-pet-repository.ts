import { Prisma, Pet } from '@prisma/client';
import { IPetRepository } from '../implementations/IPetRepository';

export class InMemoryPetRepository implements IPetRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
		throw new Error('Method not implemented.');
	}

	index(): Promise<Pet[]> {
		throw new Error('Method not implemented.');
	}

	indexAvailables(): Promise<Pet[]> {
		throw new Error('Method not implemented.');
	}

	findById(id: string): Promise<Pet | null> {
		throw new Error('Method not implemented.');
	}

	search(query: string): Promise<Pet[]> {
		throw new Error('Method not implemented.');
	}
}
