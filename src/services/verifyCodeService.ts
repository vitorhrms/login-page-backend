export const verifyCodeService = async (code: string) => {
  try {
    // TODO:
    return {
      canAccess: false,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
