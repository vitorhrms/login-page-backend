export const sendEmailService = async (email: string) => {
  try {
    // TODO:
    // function to generate MFA code
    // function to save MFA code on user
    // function to send email
    return {
      emailSent: false,
    };
  } catch (e: any) {
    throw new Error(e);
  }
};
