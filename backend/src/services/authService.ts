import prisma from '../database/prismaClient';

/**
 * Cadastra um novo usuário no banco de dados MySQL via Prisma.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<{ token: string }>} Retorna um token JWT falso para manter o padrão.
 * @throws {Error} Se o usuário já existir.
 */
export const registerUser = async (email: string, password: string) => {
  // 1. O Prisma vai no MySQL verificar se o e-mail já existe
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  // 2. O Prisma insere o novo usuário na tabela "User"
  const newUser = await prisma.user.create({
    data: {
      email,
      password, // Num projeto avançado, usaríamos a biblioteca 'bcrypt' para criptografar isso!
    },
  });

  return { token: `fake-jwt-token-${newUser.id}` };
};

/**
 * Realiza o login verificando credenciais na tabela User do MySQL.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<{ token: string }>} Retorna um token JWT.
 * @throws {Error} Se as credenciais forem inválidas.
 */
export const loginRequest = async (email: string, password: string) => {
  // 1. Busca o usuário pelo e-mail
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  // 2. Verifica se o usuário existe e se a senha bate
  if (!user || user.password !== password) {
    throw new Error('E-mail ou senha incorretos.');
  }

  return { token: `fake-jwt-token-${user.id}` };
};