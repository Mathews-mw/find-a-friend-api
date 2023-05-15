import { randomUUID } from 'node:crypto';
import { Prisma, OrgsAddress } from '@prisma/client';
import { IOrgAddressRepository } from '../implementations/IOrgAddressRepository';

export class InMemoryOrgAddressRepository implements IOrgAddressRepository {
	public orgsAddresses: OrgsAddress[] = [];

	async create(data: Prisma.OrgsAddressUncheckedCreateInput): Promise<OrgsAddress> {
		const newOrgAddress = {
			id: randomUUID(),
			org_id: data.org_id,
			address_id: data.address_id,
		};

		this.orgsAddresses.push(newOrgAddress);

		return newOrgAddress;
	}

	async findByOrgId(orgId: string): Promise<OrgsAddress | null> {
		const orgAddress = this.orgsAddresses.find((item) => item.org_id === orgId);

		if (!orgAddress) {
			return null;
		}

		return orgAddress;
	}
}
