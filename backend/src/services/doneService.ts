import prisma from '../database/prismaClient';

/**
 * Busca todas as receitas concluídas de um utilizador.
 * @param {string} email - Email do utilizador.
 */
export const getDoneRecipes = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizador não encontrado.');

  return prisma.doneRecipe.findMany({
    where: { userId: user.id },
    orderBy: { doneDate: 'desc' } // Traz as mais recentes primeiro
  });
};

/**
 * Adiciona uma receita ao histórico de concluídas do utilizador.
 * @param {string} email - Email do utilizador.
 * @param {any} recipeData - Dados da receita concluída.
 */
export const addDoneRecipe = async (email: string, recipeData: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Utilizador não encontrado.');

  // Formata as tags (que vêm como array do Frontend) para uma string separada por vírgulas, pois foi assim que definimos no Prisma
  const tagsString = Array.isArray(recipeData.tags) ? recipeData.tags.join(',') : recipeData.tags;

  return prisma.doneRecipe.create({
    data: {
      recipeId: recipeData.recipeId,
      type: recipeData.type,
      nationality: recipeData.nationality,
      category: recipeData.category,
      name: recipeData.name,
      image: recipeData.image,
      tags: tagsString,
      userId: user.id,
    },
  });
};