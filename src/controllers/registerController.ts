import { registerService } from '@/services/registerService';
import { registerRequestData, validateRegisterRequest } from '@/validator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcrypt';

export const registerController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requestData = req.body as registerRequestData;

    try {
      validateRegisterRequest(requestData);
    } catch (e: any) {
      reply.code(400).send({
        success: false,
        error: e.message,
      });
      return;
    }

    const { user, email, pass } = requestData;

    const encryptPass = await hash(pass, 10);

    const response = await registerService(user, email, encryptPass);

    reply.code(200).send({
      success: true,
      data: {
        success: response.success,
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
