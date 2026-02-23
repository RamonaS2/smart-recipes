import { PrismaClient } from '@prisma/client';

/**
 * Instância única do Prisma Client para toda a aplicação.
 * Evita a criação de múltiplas conexões com o banco de dados.
 */
const prisma = new PrismaClient();

export default prisma;