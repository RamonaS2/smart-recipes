import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

/**
 * Interface para os dados do usuário armazenados.
 */
interface UserData {
  email: string;
}

/**
 * Componente da tela de Perfil do usuário.
 * Exibe informações da conta e links para áreas restritas.
 * @returns {JSX.Element} Página de Perfil.
 */
function Profile() {
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: UserData = JSON.parse(storedUser);
        setUserEmail(parsedUser.email);
      } catch (error) {
        console.error('Erro ao analisar dados do usuário:', error);
      }
    }
  }, []);

  /**
   * Encerra a sessão do usuário limpando o localStorage e redirecionando para Login.
   */
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-24 font-sans">
      
      {/* Header Fixo */}
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-secondary">
            Meu <span className="text-primary">Perfil</span>
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 mt-6 flex flex-col items-center">
        
        {/* Avatar e Email */}
        <div className="bg-white w-full rounded-3xl p-8 shadow-md border border-sand flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-4xl mb-4 text-primary">
            👤
          </div>
          <h2 className="text-lg font-bold text-charcoal truncate w-full text-center">
            {userEmail || 'Usuário Não Identificado'}
          </h2>
          <p className="text-sm text-gray-400 mt-1">Chef de Cozinha</p>
        </div>

        {/* Menu de Ações */}
        <div className="w-full space-y-4">
          <button 
            onClick={() => navigate('/done-recipes')}
            className="w-full bg-white p-4 rounded-xl border border-sand shadow-sm flex items-center justify-between hover:border-primary hover:shadow-md transition-all group"
          >
            <span className="font-bold text-gray-700 flex items-center gap-3">
              <span className="text-xl">🏆</span> Receitas Concluídas
            </span>
            <span className="text-gray-300 group-hover:text-primary">➔</span>
          </button>

          <button 
            onClick={() => navigate('/favorite-recipes')}
            className="w-full bg-white p-4 rounded-xl border border-sand shadow-sm flex items-center justify-between hover:border-primary hover:shadow-md transition-all group"
          >
            <span className="font-bold text-gray-700 flex items-center gap-3">
              <span className="text-xl">❤️</span> Receitas Favoritas
            </span>
            <span className="text-gray-300 group-hover:text-primary">➔</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between hover:bg-red-500 hover:text-white transition-all text-red-500 mt-8"
          >
            <span className="font-bold flex items-center gap-3">
              <span className="text-xl">🚪</span> Sair da Conta
            </span>
          </button>
        </div>

      </main>

      {/* Inserção do Footer */}
      <Footer />
    </div>
  );
}

export default Profile;