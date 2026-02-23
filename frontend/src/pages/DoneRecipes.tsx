import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import * as doneService from '../services/doneService';

interface DoneRecipe {
  id: string;
  recipeId: string;
  type: string;
  nationality: string;
  category: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
}

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;

  useEffect(() => {
    const fetchDoneRecipes = async () => {
      if (!userEmail) return;
      try {
        const data = await doneService.getDoneRecipes(userEmail);
        
        // Formata as tags que vêm do MySQL (vêm como string "tag1,tag2" e precisamos de um array)
        const formattedData = data.map((recipe: any) => ({
          ...recipe,
          tags: recipe.tags ? recipe.tags.split(',') : []
        }));
        
        setDoneRecipes(formattedData);
      } catch (error) {
        console.error('Erro ao carregar o histórico:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoneRecipes();
  }, [userEmail]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-PT'); // Formato Português
  };

  if (isLoading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center font-bold text-primary">A carregar histórico... 🍽️</div>;
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-24 font-sans">
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-secondary">
              Receitas <span className="text-primary">Concluídas</span>
            </h1>
          </div>
        </div>
      </header>

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
            {doneRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-2xl shadow-sm border border-sand flex overflow-hidden hover:shadow-md transition-shadow"
              >
                <div 
                  className="w-2/5 md:w-1/3 cursor-pointer"
                  onClick={() => navigate(`/${recipe.type}s/${recipe.recipeId}`)}
                >
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 flex flex-col justify-center w-full">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-bold text-gray-400">
                      {recipe.nationality} • {recipe.category}
                    </p>
                  </div>
                  
                  <h3 
                    className="font-bold text-lg text-charcoal cursor-pointer hover:text-primary transition-colors line-clamp-1"
                    onClick={() => navigate(`/${recipe.type}s/${recipe.recipeId}`)}
                  >
                    {recipe.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Feita a: <span className="font-medium text-secondary">{formatDate(recipe.doneDate)}</span>
                  </p>

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