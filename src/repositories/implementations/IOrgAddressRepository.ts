import { OrgsAddress, Prisma } from '@prisma/client';

export interface IOrgAddressRepository {
	create(data: Prisma.OrgsAddressUncheckedCreateInput): Promise<OrgsAddress>;
	findByOrgId(orgId: string): Promise<OrgsAddress | null>;
}
