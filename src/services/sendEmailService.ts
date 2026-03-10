import { env } from '@/config/env';
import { htmlFormatter } from '@/utils/mailTemplate';
import nodemailer from 'nodemailer';

export const sendEmailService = async (email: string, code: number) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    const html = htmlFormatter(code);

    const mailOptions = {
      from: `"App" <${env.EMAIL_USER}>`,
      to: email,
      subject: 'Código de segurança.',
      text: `Seu código de verificação é: ${code}`,
      html: html,
    };

    await transporter.sendMail(mailOptions);

    return {
      emailSent: true,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
