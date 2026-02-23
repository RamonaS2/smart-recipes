import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/authService';

/**
 * Componente da tela de Cadastro.
 * Permite que novos usuários criem uma conta e sejam autenticados automaticamente.
 * @returns {JSX.Element} Página de Registro.
 */
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword && password !== '';
  const isButtonDisabled = !(isEmailValid && isPasswordValid && doPasswordsMatch) || isLoading;

  /**
   * Manipula a submissão do formulário de registro.
   * @param {React.FormEvent} event - Evento de submissão do formulário.
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await registerRequest(email, password);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ email }));
      
      navigate('/meals');
    } catch (err: any) {
      setError(err.message || 'Erro ao conectar com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream text-charcoal font-sans p-4">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-sand">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 p-4 rounded-full mb-4">
            <span className="text-4xl">📝</span>
          </div>
          <h1 className="text-3xl font-extrabold text-charcoal tracking-tight text-center">
            Criar <span className="text-primary">Conta</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium text-center">
            Junte-se à nossa cozinha inteligente.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded text-sm text-red-600 flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

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

          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-charcoal placeholder-gray-300"
            />
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a senha"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-charcoal placeholder-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`
              mt-4 w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all duration-300
              ${isButtonDisabled 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
              }
            `}
          >
            {isLoading ? 'Criando conta...' : 'Cadastrar'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{' '}
            <button 
              onClick={() => navigate('/')}
              className="text-secondary font-bold hover:underline"
            >
              Fazer Login
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;