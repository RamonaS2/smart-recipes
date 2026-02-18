const API_URL = 'http://localhost:3001';

/**
 * Obtém os cabeçalhos de autenticação com o token JWT armazenado.
 * Necessário para rotas protegidas no backend.
 * * @returns {HeadersInit} Objeto de headers contendo o Token Bearer (ou similar).
 */
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': token || '',
    'Content-Type': 'application/json'
  };
};

/**
 * Busca refeições na API do backend (BFF).
 * Suporta um termo de busca opcional.
 * * @param {string} [query=''] - Termo de pesquisa.
 * @returns {Promise<any[]>} Lista de refeições encontradas.
 * @throws {Error} Se a resposta da rede não for ok.
 */
export const fetchMeals = async (query: string = '') => {
  const response = await fetch(`${API_URL}/meals?search=${query}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Falha ao buscar refeições');
  return response.json();
};

/**
 * Busca todas as categorias de refeições disponíveis.
 * Utilizado para montar a barra de filtros laterais ou superiores.
 * * @returns {Promise<any[]>} Lista de categorias.
 */
export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/meals/categories`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Falha ao buscar categorias');
  return response.json();
};

/**
 * Busca refeições filtradas por uma categoria específica.
 * * @param {string} category - Nome da categoria para filtro.
 * @returns {Promise<any[]>} Lista de refeições filtradas.
 */
export const fetchByCategory = async (category: string) => {
  const response = await fetch(`${API_URL}/meals/filter?category=${category}`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Falha ao filtrar refeições');
  return response.json();
};