const API_URL = 'http://localhost:3001';

/**
 * Realiza a requisição de login para o backend.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<{token: string}>} Objeto contendo o token JWT.
 * @throws {Error} Lança erro caso as credenciais sejam inválidas.
 */
export const loginRequest = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao conectar com o servidor.');
  }

  return response.json();
};

/**
 * Realiza a requisição de cadastro (registro) para o backend.
 * @param {string} email - Email do novo usuário.
 * @param {string} password - Senha do novo usuário.
 * @returns {Promise<{token: string}>} Objeto contendo o token JWT do novo usuário.
 * @throws {Error} Lança erro caso o e-mail já exista ou dados sejam inválidos.
 */
export const registerRequest = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao realizar o cadastro.');
  }

  return response.json();
};