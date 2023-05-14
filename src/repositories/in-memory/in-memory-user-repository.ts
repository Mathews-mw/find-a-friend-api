import { randomUUID } from 'node:crypto';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from '../implementations/IUserRepository';

export class InMemoryUserRepository implements IUserRepository {
	public users: User[] = [];

	async create(data: Prisma.UserUncheckedCreateInput) {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password: data.password,
			phone: data.phone ?? null,
			role: data.role ? data.role : 'MEMBER',
			created_at: new Date(),
		};

		this.users.push(user);

		return user;
	}

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);

		if (!user) {
			return null;
		}

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);

		if (!user) {
			return null;
		}

		return user;
	}
}
