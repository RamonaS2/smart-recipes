const API_URL = 'http://localhost:3001';

export const fetchMeals = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/meals`, {
    headers: {
      'Authorization': token || ''
    }
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar receitas');
  }

  return response.json();
};