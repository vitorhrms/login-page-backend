import { FastifyReply, FastifyRequest } from 'fastify';
import { VerifyCodeRequestData, validateVerifyCodeRequest } from '../validator/index';
import { verifyCodeService } from '@/services/verifyCodeService';

export const sendEmailController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requestData = req.body as VerifyCodeRequestData;

    try {
      validateVerifyCodeRequest(requestData);
    } catch (e: any) {
      reply.code(400).send({
        success: false,
        error: e.message,
      });
      return;
    }

    const { code } = requestData;

    const response = await verifyCodeService(code);

    reply.code(200).send({
      success: true,
      data: {
        canAccess: response?.canAccess,
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
