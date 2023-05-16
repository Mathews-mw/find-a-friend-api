import { Pet, Prisma } from '@prisma/client';

export interface IPetRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
	index(): Promise<Pet[]>;
	indexAvailables(): Promise<Pet[]>;
	findById(id: string): Promise<Pet | null>;
	search(query: string): Promise<Pet[]>;
}
