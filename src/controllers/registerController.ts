import { registerService } from '@/services/registerService';
import { registerRequestData, validateRegisterRequest } from '@/validator';
import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcrypt';
import { findUserByEmail, findUserByUser } from '@/repositories/userRepository';

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

    let foundUser = findUserByUser(user);
    if (foundUser) {
      reply.code(200).send({
        success: false,
        data: {
          success: false,
          error: 'user',
          msg: 'User already in use',
        },
      });
    }

    if (!foundUser) {
      foundUser = findUserByEmail(email);
      if (foundUser) {
        reply.code(200).send({
          success: false,
          data: {
            success: false,
            error: 'email',
            msg: 'Email already in use',
          },
        });
      }
    }

    const response = await registerService(user, email, encryptPass);

    reply.code(201).send({
      success: true,
      data: {
        success: true,
        data: response.success,
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
