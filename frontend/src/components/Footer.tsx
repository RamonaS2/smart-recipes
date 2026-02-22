import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Componente de navegação inferior (Bottom Navigation).
 * Fixo na parte inferior da tela, provê acesso rápido às seções principais.
 * @returns {JSX.Element} Elemento de rodapé.
 */
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Verifica se o caminho atual corresponde à aba para aplicar o estilo ativo.
   * @param {string} path - Caminho da rota a ser verificado.
   * @returns {boolean} Verdadeiro se a rota estiver ativa.
   */
  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-sand shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 pb-safe">
      <div className="max-w-5xl mx-auto flex justify-around items-center p-3">
        
        {/* Aba Comidas */}
        <button 
          onClick={() => navigate('/meals')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${
            isActive('/meals') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl">🍔</span>
          <span className="text-[10px] font-bold">Comidas</span>
        </button>

        {/* Aba Favoritos (Preparando para a Opção B) */}
        <button 
          onClick={() => navigate('/favorite-recipes')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${
            isActive('/favorite-recipes') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl">❤️</span>
          <span className="text-[10px] font-bold">Favoritos</span>
        </button>

        {/* Aba Perfil */}
        <button 
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 p-2 transition-all ${
            isActive('/profile') ? 'text-primary scale-110' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <span className="text-2xl">👤</span>
          <span className="text-[10px] font-bold">Perfil</span>
        </button>

      </div>
    </footer>
  );
}

export default Footer;