import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Validação simples de email usando Regex
  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length > 6;
  const isButtonDisabled = !(isEmailValid && isPasswordValid);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Salva os tokens no localStorage (requisito do projeto original)
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    // Redireciona para a tela de comidas
    navigate('/meals');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
          Smart Cook
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-testid="email-input"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-gray-600">Senha</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mais de 6 caracteres"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              data-testid="password-input"
            />
          </label>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="mt-4 bg-purple-600 text-white font-bold py-3 rounded hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
