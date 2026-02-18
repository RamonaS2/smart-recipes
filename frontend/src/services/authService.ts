const API_URL = 'http://localhost:3001';

interface LoginResponse {
  token: string;
  user?: {
    email: string;
  };
}

export const loginRequest = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Falha ao realizar login');
    }

    return data; 
  } catch (error: any) {
    // Repassa o erro para quem chamou a função
    throw error;
  }
};