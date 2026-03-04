import { FastifyRequest, FastifyReply } from 'fastify';
export const errorHandler = async (error: any, request: FastifyRequest, reply: FastifyReply) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error && typeof error === 'object' && 'statusCode' in error) {
    statusCode = error.statusCode;
    message = error.message || message;
  } else if (error && typeof error === 'object' && error.validation) {
    statusCode = 400;
    message = `Validation error: ${error.message}`;
  } else if (error && typeof error === 'object' && error.statusCode === 401) {
    statusCode = 401;
    message = error.message || 'Unauthorized';
  } else if (error && typeof error === 'object' && error.statusCode === 403) {
    statusCode = 403;
    message = error.message || 'Forbidden';
  } else if (error && typeof error === 'object' && error.statusCode === 404) {
    statusCode = 404;
    message = error.message || 'Not Found';
  } else if (error instanceof Error) {
    if (error.message.includes('required') || error.message.includes('validation')) {
      statusCode = 400;
      message = error.message;
    } else if (error.message.includes('not found')) {
      statusCode = 404;
      message = error.message;
    } else if (error.message.includes('unauthorized') || error.message.includes('token')) {
      statusCode = 401;
      message = error.message;
    } else if (
      error.message.includes('connection') ||
      error.message.includes('timeout') ||
      error.message.includes('ECONNREFUSED')
    ) {
      statusCode = 502;
      message = error.message;
    } else {
      message = error.message;
    }
  } else if (error && typeof error === 'object' && 'code' in error) {
    const connectionError = error as any;
    if (connectionError.code === 'ECONNREFUSED' || connectionError.code === 'ECONNABORTED') {
      statusCode = 502;
      message = connectionError.message || 'Erro de conexão com serviço externo';
    }
  }

  if (statusCode < 100 || statusCode > 599) {
    statusCode = 500;
  }

  reply.code(statusCode).send({
    success: false,
    error: message,
    message: 'An error occurred while processing your request',
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  });
};
