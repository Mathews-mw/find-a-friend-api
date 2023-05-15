import { UserAlreadyExistsError } from '@/useCases/errors/user-already-exists-error';
import { makeCreateUserUseCase } from '@/useCases/factories/make-create-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function create(
	requset: FastifyRequest,
	reply: FastifyReply
): Promise<FastifyReply> {
	const createBodySchema = z.object({
		name: z.string(),
		email: z.string(),
		password: z.string(),
		phone: z.string(),
	});

	const { name, email, password, phone } = createBodySchema.parse(requset.body);

	try {
		const createUserUseCase = makeCreateUserUseCase();

		await createUserUseCase.execute({
			name,
			email,
			password,
			phone,
		});

		return reply.status(201).send({ message: 'Usuário cadastrado com sucesso' });
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		console.log('error: ', error);
		return reply.status(500).send();
	}
}
