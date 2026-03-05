export interface LoginRequestData {
  user: string;
  pass: string;
}

export const validateLoginRequest = (data: LoginRequestData): void => {
  if (!data) {
    throw new Error('Dados de requisição não fornecidos');
  }

  if (!data.user || typeof data.user !== 'string') {
    throw new Error('Usuário não fornecidos');
  }

  if (!data.pass || typeof data.pass !== 'string') {
    throw new Error('Senha não fornecidos');
  }
};

export interface SendEmailRequestData {
  email: string;
}

export const validateSendEmailRequest = (data: SendEmailRequestData): void => {
  if (!data) {
    throw new Error('Dados de requisição não fornecidos');
  }

  if (!data.email || typeof data.email !== 'string') {
    throw new Error('Email não fornecidos');
  }
};

export interface VerifyCodeRequestData {
  code: string;
}

export const validateVerifyCodeRequest = (data: VerifyCodeRequestData): void => {
  if (!data) {
    throw new Error('Dados de requisição não fornecidos');
  }

  if (!data.code || typeof data.code !== 'string') {
    throw new Error('Código não fornecidos');
  }
};
