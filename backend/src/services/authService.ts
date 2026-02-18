import jwt from 'jsonwebtoken';

// Removemos a leitura do SECRET daqui de fora para evitar o erro de carregamento

const MOCK_USER = {
  email: 'teste@smartcook.com',
  password: '1234567',
};

interface LoginResponse {
  status: number;
  message?: string;
  token?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  // CORREÇÃO: Lemos a variável de ambiente AQUI DENTRO, na hora que a função é executada
  const secret = process.env.JWT_SECRET;

  // 1. Fail-safe: Agora vai funcionar porque o dotenv já carregou
  if (!secret) {
    throw new Error('FATAL: JWT_SECRET não foi definido no arquivo .env');
  }

  // 2. Validação básica
  if (!email || !password) {
    return { status: 400, message: 'Os campos "email" e "password" são obrigatórios.' };
  }

  // 3. Verificação de Credenciais
  if (email !== MOCK_USER.email || password !== MOCK_USER.password) {
    return { status: 401, message: 'Email ou senha inválidos.' };
  }

  // 4. Geração do Token usando a variável 'secret' local
  const token = jwt.sign(
    { email, role: 'user' }, 
    secret, // <--- Usamos a variável local aqui
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    }
  );

  return { status: 200, token };
};