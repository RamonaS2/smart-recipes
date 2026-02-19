import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMealById } from '../services/mealsService';
import { getIngredients, type MealDetail } from '../utils/recipeUtils';

function InProgress() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Carrega a Receita e o Progresso Salvo
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const data = await fetchMealById(id);
        setMeal(data);

        // Recupera o progresso do localStorage
        // Formato salvo: { "52772": ["Salt", "Chicken"], "52999": ["Sugar"] }
        const savedProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
        if (savedProgress[id]) {
          setCheckedIngredients(savedProgress[id]);
        }
      } catch (error) {
        console.error('Erro ao carregar:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  // 2. Atualiza o Checkbox e Salva no LocalStorage
  const toggleIngredient = (ingredientName: string) => {
    if (!id) return;

    setCheckedIngredients((prev) => {
      const isChecked = prev.includes(ingredientName);
      let newChecked;

      if (isChecked) {
        newChecked = prev.filter((item) => item !== ingredientName); // Remove
      } else {
        newChecked = [...prev, ingredientName]; // Adiciona
      }

      // Salva no localStorage imediatamente
      const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...currentStorage,
        [id]: newChecked
      }));

      return newChecked;
    });
  };

  if (isLoading || !meal) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center animate-pulse text-primary font-bold">
        Carregando seus ingredientes... 🔪
      </div>
    );
  }

  const ingredients = getIngredients(meal);
  const totalIngredients = ingredients.length;
  const progressPercentage = Math.round((checkedIngredients.length / totalIngredients) * 100);
  const isFinished = progressPercentage === 100;

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20 font-sans">
      
      {/* Imagem de Topo Compacta */}
      <div className="relative h-48 w-full">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white text-center px-4 drop-shadow-md">
            {meal.strMeal}
          </h1>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-white hover:text-primary transition-all"
        >
          ⬅️ Voltar
        </button>
      </div>

      <main className="max-w-3xl mx-auto p-6 -mt-6 relative z-10">
        
        {/* Card de Progresso */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-sand mb-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-xl font-bold text-primary">Progresso</h2>
            <span className="text-2xl font-bold text-secondary">{progressPercentage}%</span>
          </div>
          
          {/* Barra de Progresso Visual */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-secondary h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          {isFinished && (
            <p className="text-center text-secondary font-bold mt-3 animate-bounce">
              🎉 Tudo pronto! Pode finalizar a receita.
            </p>
          )}
        </div>

        {/* Lista de Ingredientes (Checkboxes) */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-sand space-y-4">
          <h3 className="font-bold text-lg text-charcoal mb-4">Passo a Passo (Ingredientes)</h3>
          
          {ingredients.map((item, index) => {
            const isChecked = checkedIngredients.includes(item.name);
            return (
              <label 
                key={index} 
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${isChecked 
                    ? 'bg-green-50 border-secondary/30' 
                    : 'bg-white border-gray-100 hover:border-primary/50'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleIngredient(item.name)}
                  className="w-6 h-6 text-secondary focus:ring-secondary rounded-md border-gray-300"
                />
                <div className={`flex flex-col ${isChecked ? 'opacity-50 line-through decoration-secondary' : ''}`}>
                  <span className="font-bold text-charcoal">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.measure}</span>
                </div>
              </label>
            );
          })}
        </div>

        {/* Botão Finalizar */}
        <button
          disabled={!isFinished}
          onClick={() => navigate('/meals')} // Futuramente, levar para tela de "Receitas Feitas"
          className={`
            w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-md transition-all
            ${isFinished 
              ? 'bg-primary text-white hover:bg-primary-dark hover:scale-105 cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {isFinished ? 'Finalizar Receita 🏆' : 'Marque todos os itens para finalizar'}
        </button>

      </main>
    </div>
  );
}

export default InProgress;