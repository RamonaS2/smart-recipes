import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

/**
 * Interface que define a estrutura de uma receita concluída guardada no localStorage.
 */
interface DoneRecipe {
  id: string;
  type: string;
  nationality: string;
  category: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}

/**
 * Componente que apresenta o histórico de receitas finalizadas.
 */
function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Carrega as receitas do localStorage assim que a página é montada
    const storedRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    setDoneRecipes(storedRecipes);
  }, []);

  /**
   * Formata a data ISO para um formato amigável (ex: 18/02/2026).
   * @param {string} isoString - A string de data no formato ISO.
   * @returns {string} Data formatada.
   */
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20 font-sans">
      
      {/* Header */}
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/meals')}
              className="text-2xl hover:scale-110 transition-transform"
            >
              🏠
            </button>
            <h1 className="text-2xl font-bold text-secondary">
              Receitas <span className="text-primary">Concluídas</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Grid de Receitas */}
      <main className="max-w-5xl mx-auto p-6 mt-4">
        {doneRecipes.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <span className="text-6xl mb-4 opacity-50">🍽️</span>
            <p className="text-gray-500 font-medium">Ainda não finalizou nenhuma receita.</p>
            <button 
              onClick={() => navigate('/meals')}
              className="mt-6 text-primary font-bold underline hover:text-primary-dark"
            >
              Ir para o Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doneRecipes.map((recipe, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-sand flex overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Imagem */}
                <div 
                  className="w-2/5 md:w-1/3 cursor-pointer"
                  onClick={() => navigate(`/${recipe.type}s/${recipe.id}`)}
                >
                  <img 
                    src={recipe.image} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-4 flex flex-col justify-center w-full">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-gray-400">
                      {recipe.nationality} • {recipe.category}
                    </p>
                  </div>
                  
                  <h3 
                    className="font-bold text-lg text-charcoal cursor-pointer hover:text-primary transition-colors line-clamp-1"
                    onClick={() => navigate(`/${recipe.type}s/${recipe.id}`)}
                  >
                    {recipe.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Feita em: <span className="font-medium text-secondary">{formatDate(recipe.doneDate)}</span>
                  </p>

                  {/* Tags */}
                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {recipe.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] bg-sand/50 text-gray-600 px-2 py-1 rounded-full font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default DoneRecipes;