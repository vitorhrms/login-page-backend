import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginRequestData, validateLoginRequest } from '../validator/index';
import { loginService } from '@/services/loginService';

export const loginController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requestData = req.body as LoginRequestData;

    try {
      validateLoginRequest(requestData);
    } catch (e: any) {
      reply.code(400).send({
        success: false,
        error: e.message,
      });
      return;
    }

    const { user, pass } = requestData;

    const response = await loginService(user, pass);

    reply.code(200).send({
      success: true,
      data: {
        canLogin: response?.canLogin,
        email: response?.email,
        id: response?.id,
      },
    });
  } catch (error: any) {
    reply.code(500).send({
      success: false,
      error: error.message || 'Erro interno do servidor',
      details: error.details || undefined,
    });
  }
};
