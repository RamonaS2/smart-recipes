import prisma from '../database/prismaClient';

/**
 * Busca todas as receitas favoritas de um utilizador.
 * @param {string} email - Email do utilizador.
 */
export const getFavorites = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizador não encontrado.');

  return prisma.favoriteRecipe.findMany({
    where: { userId: user.id },
  });
};

/**
 * Adiciona uma nova receita aos favoritos do utilizador.
 * @param {string} email - Email do utilizador.
 * @param {any} recipeData - Dados da receita (id, nome, imagem, etc).
 */
export const addFavorite = async (email: string, recipeData: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizador não encontrado.');

  return prisma.favoriteRecipe.create({
    data: {
      recipeId: recipeData.recipeId,
      type: recipeData.type,
      nationality: recipeData.nationality,
      category: recipeData.category,
      name: recipeData.name,
      image: recipeData.image,
      userId: user.id, // Ligação com o utilizador
    },
  });
};

/**
 * Remove uma receita dos favoritos.
 * @param {string} email - Email do utilizador.
 * @param {string} recipeId - ID da receita na API externa.
 */
export const removeFavorite = async (email: string, recipeId: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizador não encontrado.');

  // Apaga usando a chave composta (ID do utilizador + ID da receita) que criamos no schema
  return prisma.favoriteRecipe.delete({
    where: {
      userId_recipeId: {
        userId: user.id,
        recipeId: recipeId,
      },
    },
  });
};