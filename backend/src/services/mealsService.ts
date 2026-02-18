import axios from 'axios';

// URL da API pública (TheMealDB)
const EXTERNAL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

/**
 * Busca todas as receitas na API externa do TheMealDB.
 * @returns Lista de receitas ou array vazio em caso de erro.
 */
export const getAllMeals = async () => {
  try {
    const response = await axios.get(EXTERNAL_API);
    return response.data.meals || [];
  } catch (error) {
    console.error('Erro ao buscar receitas externas:', error);
    throw new Error('Falha ao comunicar com API de receitas');
  }
};