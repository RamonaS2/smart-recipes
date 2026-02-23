import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import * as favoriteService from '../services/favoriteService';

interface FavoriteRecipe {
  id: string;
  recipeId: string;
  type: string;
  nationality: string;
  category: string;
  name: string;
  image: string;
}

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userEmail) return;
      try {
        const data = await favoriteService.getFavorites(userEmail);
        setFavorites(data);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [userEmail]);

  const handleRemoveFavorite = async (recipeId: string) => {
    if (!userEmail) return;
    try {
      await favoriteService.removeFavorite(userEmail, recipeId);
      // Atualiza o estado visualmente removendo a receita da lista
      setFavorites(favorites.filter((recipe) => recipe.recipeId !== recipeId));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      alert('Não foi possível remover.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-cream flex items-center justify-center font-bold text-primary">Carregando... 🍽️</div>;
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-24 font-sans">
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-secondary">
            Receitas <span className="text-primary">Favoritas</span>
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 mt-4">
        {favorites.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <span className="text-6xl mb-4 opacity-50">💔</span>
            <p className="text-gray-500 font-medium">Ainda não tem receitas favoritas.</p>
            <button 
              onClick={() => navigate('/meals')}
              className="mt-6 text-primary font-bold underline hover:text-primary-dark"
            >
              Explorar Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((recipe) => (
              <div 
                key={recipe.id}
                className="bg-white rounded-2xl shadow-sm border border-sand flex overflow-hidden hover:shadow-md transition-shadow relative"
              >
                <div 
                  className="w-2/5 md:w-1/3 cursor-pointer"
                  onClick={() => navigate(`/${recipe.type}s/${recipe.recipeId}`)}
                >
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 flex flex-col justify-center w-full">
                  <p className="text-xs font-bold text-gray-400 mb-1">
                    {recipe.nationality} • {recipe.category}
                  </p>
                  
                  <h3 
                    className="font-bold text-lg text-charcoal cursor-pointer hover:text-primary transition-colors line-clamp-1 pr-8"
                    onClick={() => navigate(`/${recipe.type}s/${recipe.recipeId}`)}
                  >
                    {recipe.name}
                  </h3>
                  
                  <button 
                    onClick={() => handleRemoveFavorite(recipe.recipeId)}
                    className="absolute top-4 right-4 text-primary hover:scale-110 transition-transform bg-cream p-2 rounded-full shadow-sm"
                    title="Remover dos favoritos"
                  >
                    ❤️
                  </button>
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

export default FavoriteRecipes;