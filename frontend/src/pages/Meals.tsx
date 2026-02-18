import { useEffect, useState } from 'react';
import { fetchMeals } from '../services/mealsService';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getFood = async () => {
      try {
        const data = await fetchMeals();
        // Peguei apenas as 12 primeiras para não pesar a tela inicial
        setMeals(data.slice(0, 12));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getFood();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center text-primary font-bold text-xl">
        <span className="animate-bounce">Preparando a cozinha... 🍳</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20">
      {/* Header Simples */}
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary">
            Menu <span className="text-primary">Smart</span>
          </h1>
          <div className="w-8 h-8 bg-primary rounded-full text-white flex items-center justify-center font-bold text-sm">
            R
          </div>
        </div>
      </header>

      {/* Grid de Receitas */}
      <main className="max-w-4xl mx-auto p-6">
        <h2 className="text-xl font-bold mb-6 text-charcoal border-l-4 border-primary pl-3">
          Recomendados para você
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div 
              key={meal.idMeal}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-sand group cursor-pointer"
            >
              {/* Imagem com efeito de zoom suave */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 right-0 bg-cream px-3 py-1 rounded-tl-lg text-xs font-bold text-secondary shadow-sm">
                  {meal.strCategory}
                </div>
              </div>

              {/* Corpo do Card */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-charcoal mb-1 truncate">
                  {meal.strMeal}
                </h3>
                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                  🌍 {meal.strArea}
                </p>
                
                <button className="w-full py-2 rounded-lg border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                  Ver Receita
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Meals;