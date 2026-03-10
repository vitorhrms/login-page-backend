import { getCodeByUserId } from '@/repositories/mfaRepository';

export const verifyCodeService = async (user_id: number, code: number) => {
  try {
    const otp_hash = getCodeByUserId(user_id);

    let canAccess = false;
    if (otp_hash) {
      canAccess = code == otp_hash.otp_hash;
    }

    return {
      canAccess: canAccess,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
