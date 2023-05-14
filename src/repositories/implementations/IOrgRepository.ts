import { Org, Prisma } from '@prisma/client';

export interface IOrgRepository {
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
	index(): Promise<Org[]>;
	findById(id: string): Promise<Org | null>;
	findByEmail(email: string): Promise<Org | null>;
	searchMany(query: string, page: number): Promise<Org[]>;
}
