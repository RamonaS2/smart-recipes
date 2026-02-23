import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length > 6;
  const isButtonDisabled = !(isEmailValid && isPasswordValid) || isLoading;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginRequest(email, password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email }));
      
      // Mantendo compatibilidade com projetos antigos, se necessário
      localStorage.setItem('mealsToken', '1');
      localStorage.setItem('cocktailsToken', '1');

      navigate('/meals');
      
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Fundo CREME ocupando toda a tela
    <div className="min-h-screen flex items-center justify-center bg-cream text-charcoal font-sans">
      
      {/* Card Principal */}
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-sand">
        
        {/* Cabeçalho com Ícone e Título */}
        <div className="flex flex-col items-center mb-8">
          {/* Ícone de Chapéu de Chef (SVG) na cor Sálvia */}
          <div className="bg-green-50 p-4 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-10 h-10 text-secondary"
            >
              <path d="M11.7 2.805a.75.75 0 0 1 .6 0A6.003 6.003 0 0 1 20.035 6 6 6 0 0 1 19.5 12.03V15c0 .414.336.75.75.75h.75a.75.75 0 0 1 .75.75v3a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 19.5v-3a.75.75 0 0 1 .75-.75h.75c.414 0 .75-.336.75-.75v-2.97A6 6 0 0 1 11.7 2.805Z" />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold text-charcoal tracking-tight">
            Smart<span className="text-primary">Cook</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Sua cozinha, suas regras.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Input Email */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: chef@master.com"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-charcoal placeholder-gray-300"
            />
          </div>

          {/* Input Senha */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-charcoal placeholder-gray-300"
            />
          </div>

          {/* Botão de Ação (Salmão) */}
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`
              mt-6 w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-300
              ${isButtonDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
              }
            `}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Entrando...
              </span>
            ) : (
              'Acessar Receitas'
            )}
          </button>
        </form>

        {/* Link para Cadastro - ADICIONADO AQUI */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-gray-500">
            Ainda não tem uma conta?{' '}
            <button 
              onClick={() => navigate('/register')}
              className="text-secondary font-bold hover:underline"
            >
              Cadastre-se
            </button>
          </p>
          
          <p className="text-xs text-gray-400">
            © 2026 Smart Cook Project
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;