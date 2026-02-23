const API_URL = 'http://localhost:3001/favorites';

/**
 * Busca os favoritos de um utilizador na base de dados.
 */
export const getFavorites = async (email: string) => {
  const response = await fetch(`${API_URL}/${email}`);
  if (!response.ok) throw new Error('Erro ao buscar favoritos');
  return response.json();
};

/**
 * Adiciona uma receita aos favoritos na base de dados.
 */
export const addFavorite = async (email: string, recipeData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, recipeData }),
  });
  if (!response.ok) throw new Error('Erro ao adicionar favorito');
  return response.json();
};

/**
 * Remove uma receita dos favoritos na base de dados.
 */
export const removeFavorite = async (email: string, recipeId: string) => {
  const response = await fetch(`${API_URL}/${email}/${recipeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao remover favorito');
  return true;
};