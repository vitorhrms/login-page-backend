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
