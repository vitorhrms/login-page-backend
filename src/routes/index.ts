import { loginController } from '@/controllers/loginController';
import { registerController } from '@/controllers/registerController';
import { reSendEmailController } from '@/controllers/reSendEmailController';
import { verifyCodeController } from '@/controllers/verifyCodeController';
import { FastifyInstance } from 'fastify';

const routes = async (app: FastifyInstance): Promise<void> => {
  app.post('/register', registerController);
  app.post('/login', loginController);
  app.post('/verifyCode', verifyCodeController);
  app.post('/reSendEmail', reSendEmailController);

  app.get('/health', async (req, reply) => {
    return reply.code(200).send({
      success: true,
      message: 'API funcionando corretamente',
      timestamp: new Date().toISOString(),
      version: '2.0.0',
    });
  });
};

export default routes;
