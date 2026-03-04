import { users } from '@/utils/users';

export const loginService = async (user: string, pass: string) => {
  try {
    const foundUser = users.find((u) => (u.user === user || u.email === user) && u.pass === pass);

    return {
      canLogin: !!foundUser,
      email: foundUser?.email || '',
      id: foundUser?.id || -1,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
