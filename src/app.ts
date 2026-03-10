import appRoutes from './routes/index';
import cors from '@fastify/cors';
import fastify from 'fastify';
import { ZodError } from 'zod';
import { errorHandler } from './middlewares/errorHandler';
import { createTables } from './database/migrate';

export const app = fastify();
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'x-access-token',
  ],
});

createTables();

app.register(appRoutes, { prefix: '/api' });

app.setErrorHandler(async (err, request, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      success: false,
      error: 'Validation error',
      message: 'Request validation failed',
      issues: err.format(),
      timestamp: new Date().toISOString(),
    });
  }

  return errorHandler(err, request, reply);
});
