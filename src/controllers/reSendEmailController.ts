import { FastifyReply, FastifyRequest } from 'fastify';
import { SendEmailRequestData, validateSendEmailRequest } from '../validator/index';
import { sendEmailService } from '@/services/sendEmailService';
import { findUserByEmail } from '@/repositories/userRepository';
import { disableCode, newCode } from '@/repositories/mfaRepository';

export const reSendEmailController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requestData = req.body as SendEmailRequestData;

    try {
      validateSendEmailRequest(requestData);
    } catch (e: any) {
      reply.code(400).send({
        success: false,
        error: e.message,
      });
      return;
    }

    const { email } = requestData;

    const foundUser = findUserByEmail(email);

    if (foundUser) {
      disableCode(foundUser.id);

      const code = Math.floor(100000 + Math.random() * 999999);
      newCode(foundUser.id, code);
      await sendEmailService(foundUser.email, code);
    }

    reply.code(200).send({
      success: true,
      data: {
        emailSent: true,
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
