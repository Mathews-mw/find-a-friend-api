import { UserRepository } from '@/repositories/user-repository';
import { CreateUserUseCase } from '../user/create-user-use-case';

export function makeCreateUserUseCase() {
	const userRepository = new UserRepository();
	const createUserUseCase = new CreateUserUseCase(userRepository);

	return createUserUseCase;
}
