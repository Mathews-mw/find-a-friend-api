import { FastifyInstance } from 'fastify';
import { createUserController } from '@/controllers/users/create-user-controller';

export async function usersRoutes(app: FastifyInstance) {
	app.post('/create', createUserController);
}
