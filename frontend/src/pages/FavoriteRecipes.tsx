import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

/**
 * Interface que define a estrutura de uma receita favorita.
 */
interface FavoriteRecipe {
  id: string;
  type: string;
  nationality: string;
  category: string;
  name: string;
  image: string;
}

/**
 * Componente que apresenta a lista de receitas marcadas como favoritas pelo utilizador.
 * Permite a navegação para os detalhes da receita ou a sua remoção da lista.
 * @returns {JSX.Element} Página de Favoritos.
 */
function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorites(storedFavorites);
  }, []);

  /**
   * Remove uma receita da lista de favoritos no estado e no localStorage.
   * @param {string} id - O ID da receita a remover.
   */
  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-24 font-sans">
      
      {/* Cabeçalho */}
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-secondary">
            Receitas <span className="text-primary">Favoritas</span>
          </h1>
        </div>
      </header>

      {/* Grelha de Favoritos */}
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
                  <p className="text-xs font-bold text-gray-400 mb-1">
                    {recipe.nationality} • {recipe.category}
                  </p>
                  
                  <h3 
                    className="font-bold text-lg text-charcoal cursor-pointer hover:text-primary transition-colors line-clamp-1 pr-8"
                    onClick={() => navigate(`/${recipe.type}s/${recipe.id}`)}
                  >
                    {recipe.name}
                  </h3>
                  
                  {/* Botão Remover (Coração Partida) */}
                  <button 
                    onClick={() => handleRemoveFavorite(recipe.id)}
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