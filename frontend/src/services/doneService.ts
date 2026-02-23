const API_URL = 'http://localhost:3001/done-recipes';

/**
 * Busca o histórico de receitas concluídas do utilizador na base de dados.
 */
export const getDoneRecipes = async (email: string) => {
  const response = await fetch(`${API_URL}/${email}`);
  if (!response.ok) throw new Error('Erro ao buscar receitas concluídas');
  return response.json();
};

/**
 * Adiciona uma receita ao histórico de concluídas na base de dados.
 */
export const addDoneRecipe = async (email: string, recipeData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, recipeData }),
  });
  if (!response.ok) throw new Error('Erro ao guardar receita concluída');
  return response.json();
};