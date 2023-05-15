import { Prisma, Org } from '@prisma/client';
import { IOrgRepository } from '../implementations/IOrgRepository';
import { randomUUID } from 'node:crypto';

export class InMemoryOrgRepository implements IOrgRepository {
	public orgs: Org[] = [];

	async create(data: Prisma.OrgUncheckedCreateInput) {
		const newOrg = {
			id: randomUUID(),
			name: data.name,
			owner: data.owner,
			email: data.email,
			password: data.password,
			phone: data.phone,
			created_at: new Date(),
		};

		this.orgs.push(newOrg);

		return newOrg;
	}

	async index() {
		return this.orgs;
	}

	async findById(id: string) {
		const org = this.orgs.find((org) => org.id === id);

		if (!org) {
			return null;
		}

		return org;
	}

	async findByEmail(email: string) {
		const org = this.orgs.find((org) => org.email === email);

		if (!org) {
			return null;
		}

		return org;
	}

	async searchMany(query: string, page: number) {
		return this.orgs.filter((org) => org.name.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20);
	}
}
