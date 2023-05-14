import { describe, beforeEach, it, expect } from 'vitest';

import { CreateUserUseCase } from '@/useCases/user/create-user-use-case';
import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists-error';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

let userRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		createUserUseCase = new CreateUserUseCase(userRepository);
	});

	it('Should be able to create a new user', async () => {
		const { user } = await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john.doe@emailexample.com',
			password: 'abc742',
			phone: '99999999999',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should not be able to create a user with the same e-mail', async () => {
		await createUserUseCase.execute({
			name: 'John Doe',
			email: 'john.doe@emailexample.com',
			password: 'abc742',
			phone: '99999999999',
		});

		await expect(() =>
			createUserUseCase.execute({
				name: 'John Doe',
				email: 'john.doe@emailexample.com',
				password: 'abc742',
				phone: '99999999999',
			})
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});
