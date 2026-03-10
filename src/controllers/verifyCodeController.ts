import { FastifyReply, FastifyRequest } from 'fastify';
import { VerifyCodeRequestData, validateVerifyCodeRequest } from '../validator/index';
import { verifyCodeService } from '@/services/verifyCodeService';
import { findUserByEmail } from '@/repositories/userRepository';
import { disableCode } from '@/repositories/mfaRepository';

export const verifyCodeController = async (req: FastifyRequest, reply: FastifyReply) => {
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

    const { code, email } = requestData;

    const user = findUserByEmail(email);

    if (user) {
      const user_id = user.id;
      const response = await verifyCodeService(user_id, code);
      if (response.canAccess) {
        disableCode(user_id);
      }
      reply.code(200).send({
        success: true,
        data: {
          canAccess: response.canAccess,
        },
      });
    }

    reply.code(401).send({
      success: false,
      error: 'Usuário não encontrado',
    });
  } catch (error: any) {
    reply.code(500).send({
      success: false,
      error: error.message || 'Erro interno do servidor',
      details: error.details || undefined,
    });
  }
};
