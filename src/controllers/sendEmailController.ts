import { FastifyReply, FastifyRequest } from 'fastify';
import { SendEmailRequestData, validateSendEmailRequest } from '../validator/index';
import { sendEmailService } from '@/services/sendEmailService';

export const sendEmailController = async (req: FastifyRequest, reply: FastifyReply) => {
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

    const response = await sendEmailService(email);

    reply.code(200).send({
      success: true,
      data: {
        emailSent: response?.emailSent,
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
