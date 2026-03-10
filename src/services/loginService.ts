import { newCode } from '@/repositories/mfaRepository';
import { findUserByEmail, findUserByUser } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { sendEmailService } from './sendEmailService';

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const loginService = async (user: string, pass: string) => {
  try {
    let foundUser = findUserByEmail(user);
    if (!foundUser) {
      foundUser = findUserByUser(user);
    }
    if (!foundUser) {
      return { canLogin: false, email: '', id: -1 };
    }

    const canLogin = await validatePassword(pass, foundUser.password);

    if (canLogin) {
      const code = Math.floor(100000 + Math.random() * 999999);
      newCode(foundUser.id, code);

      await sendEmailService(foundUser.email, code);
    }

    return {
      canLogin,
      email: foundUser.email,
      id: foundUser.id,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
