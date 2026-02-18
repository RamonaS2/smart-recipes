import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Serviço responsável pela interação com a API externa TheMealDB.
 * Atua como um agregador e formatador de dados para o frontend.
 */

/**
 * Busca uma lista de refeições com base em um termo de pesquisa.
 * Se a query for vazia, a API externa retorna um conjunto padrão ou nulo dependendo do endpoint.
 * * @param {string} query - O termo de busca (opcional).
 * @returns {Promise<any[]>} Array de objetos de refeição.
 * @throws {Error} Erro de Gateway se a API externa falhar.
 */
export const getMeals = async (query: string = '') => {
  try {
    const response = await axios.get(`${API_BASE}/search.php?s=${query}`);
    return response.data.meals || [];
  } catch (error) {
    console.error(`Erro ao buscar refeições com query "${query}":`, error);
    throw new Error('Timeout ou erro no Gateway da API Externa');
  }
};

/**
 * Recupera todas as categorias de refeições disponíveis na API externa.
 * Utilizado para popular filtros no frontend.
 * * @returns {Promise<any[]>} Lista de categorias (ex: Beef, Chicken, Vegan).
 */
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/list.php?c=list`);
    return response.data.meals || [];
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw new Error('Timeout ou erro no Gateway da API Externa');
  }
};

/**
 * Filtra as refeições por uma categoria específica.
 * * @param {string} category - O nome da categoria (ex: 'Seafood').
 * @returns {Promise<any[]>} Lista de refeições pertencentes à categoria.
 */
export const filterByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_BASE}/filter.php?c=${category}`);
    return response.data.meals || [];
  } catch (error) {
    console.error(`Erro ao filtrar pela categoria "${category}":`, error);
    throw new Error('Timeout ou erro no Gateway da API Externa');
  }
};