import { createUser } from '@/repositories/userRepository';

export const registerService = async (user: string, email: string, pass: string) => {
  try {
    const success = createUser(user, email, pass);

    return {
      success,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
