import fastify from 'fastify';
import { ZodError } from 'zod';
import fastifyCookie from '@fastify/cookie';

import { env } from './env';

export const app = fastify();

app.register(fastifyCookie);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({ message: 'Validation error', issues: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.log('handler error:', error);
	}

	return reply.status(500).send({ message: 'Internal server error.' });
});