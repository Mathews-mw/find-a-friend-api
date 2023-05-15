import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { IUserRepository } from './implementations/IUserRepository';

export class UserRepository implements IUserRepository {
	async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
		const newUser = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: data.password,
				phone: data.phone,
			},
		});

		return newUser;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}
