import { hash } from 'bcryptjs';

import { User } from '@prisma/client';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { IUserRepository } from '@/repositories/implementations/IUserRepository';

interface ICreateUserUseCaseRequest {
	name: string;
	email: string;
	password: string;
	phone?: string;
}

interface ICreateUserUseCaseResponse {
	user: User;
}

export class CreateUserUseCase {
	constructor(private userRepository: IUserRepository) {}

	async execute({ name, email, password, phone }: ICreateUserUseCaseRequest): Promise<ICreateUserUseCaseResponse> {
		const userAlreadyExists = await this.userRepository.findByEmail(email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.userRepository.create({
			name,
			email,
			password: passwordHash,
			phone,
		});

		return {
			user,
		};
	}
}
