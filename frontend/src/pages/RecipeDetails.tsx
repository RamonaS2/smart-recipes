import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealById } from '../services/mealsService';
import * as favoriteService from '../services/favoriteService';

// ... (Interface MealDetail mantém-se igual)
interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube?: string;
  [key: string]: string | undefined;
}

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Vamos buscar o email do utilizador logado
  const userEmail = JSON.parse(localStorage.getItem('user') || '{}').email;

  // 1. Carrega os dados da receita e verifica no MySQL se é favorita
  useEffect(() => {
    const loadMealAndFavorites = async () => {
      if (!id) return;
      try {
        const data = await fetchMealById(id);
        setMeal(data);

        // Verifica os favoritos no Banco de Dados
        if (userEmail) {
          const userFavorites = await favoriteService.getFavorites(userEmail);
          const isFav = userFavorites.some((recipe: any) => recipe.recipeId === id);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMealAndFavorites();
  }, [id, userEmail]);

  /**
   * Alterna o estado de favorito chamando o Backend.
   */
  const toggleFavorite = async () => {
    if (!meal || !id || !userEmail) return;

    try {
      if (isFavorite) {
        // Remove do Banco de Dados
        await favoriteService.removeFavorite(userEmail, id);
        setIsFavorite(false);
      } else {
        // Adiciona ao Banco de Dados
        const recipeData = {
          recipeId: meal.idMeal,
          type: 'meal',
          nationality: meal.strArea || 'Unknown',
          category: meal.strCategory || 'Unknown',
          name: meal.strMeal,
          image: meal.strMealThumb,
        };
        await favoriteService.addFavorite(userEmail, recipeData);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      alert('Erro ao atualizar favoritos.');
    }
  };

  const getIngredients = () => { /* ... mantém igual ... */ 
    if (!meal) return [];
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ name: ingredient, measure: measure || '' });
      }
    }
    return ingredients;
  };

  const getEmbedUrl = (url: string) => { /* ... mantém igual ... */
    if (!url) return '';
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId ? videoId.indexOf('&') : -1;
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (isLoading || !meal) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center animate-pulse text-primary font-bold">
        A carregar receita... 🥘
      </div>
    );
  }

  const ingredients = getIngredients();

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-10">
      
      {/* Imagem de Capa e Botões Flutuantes */}
      <div className="relative h-80 w-full">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 max-w-4xl mx-auto w-full flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 shadow-sm">{meal.strMeal}</h1>
              <div className="flex gap-3 text-sm font-bold text-white/90">
                <span className="bg-primary px-3 py-1 rounded-full">{meal.strCategory}</span>
                <span className="bg-secondary px-3 py-1 rounded-full">{meal.strArea}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white hover:text-primary transition-all"
        >
          ⬅️ Voltar
        </button>

        {/* Botão de Favorito que agora chama a API */}
        <button 
          onClick={toggleFavorite}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg hover:scale-110 transition-transform text-2xl"
          title="Favoritar receita"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <main className="max-w-4xl mx-auto p-6 grid md:grid-cols-3 gap-8 -mt-8 relative z-10">
        
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-sand">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">🥕 Ingredientes</h2>
            <ul className="space-y-3">
              {ingredients.map((item, index) => (
                <li key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-400 text-xs">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-sand">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">👩‍🍳 Modo de Preparo</h2>
            <p className="whitespace-pre-line text-gray-600 leading-relaxed text-justify">{meal.strInstructions}</p>
          </div>

          {meal.strYoutube && (
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-sand">
              <h2 className="text-lg font-bold text-charcoal mb-4 ml-2">Vídeo Tutorial</h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe width="100%" height="100%" src={getEmbedUrl(meal.strYoutube)} title="YouTube video" frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
          )}

          <button 
            onClick={() => navigate(`/meals/${id}/in-progress`)} 
            className="w-full bg-secondary text-white font-bold py-4 rounded-xl shadow-md hover:bg-green-600 transition-all transform hover:-translate-y-1"
          >
            Iniciar Receita
          </button>
        </div>
      </main>
    </div>
  );
}

export default RecipeDetails;