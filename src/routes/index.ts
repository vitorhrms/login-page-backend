import { loginController } from '@/controllers/loginController';
import { FastifyInstance } from 'fastify';

const routes = async (app: FastifyInstance): Promise<void> => {
  app.post('/login', loginController);
  app.post('/sendEmail', loginController);
  app.post('/verifyCode', loginController);


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
