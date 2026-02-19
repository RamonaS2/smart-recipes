import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Importação nova!
import { fetchMeals, fetchCategories, fetchByCategory } from '../services/mealsService';

/**
 * Interface que define a estrutura de uma refeição vinda da API.
 */
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

/**
 * Interface para as categorias (ex: Beef, Chicken).
 */
interface Category {
  strCategory: string;
}

/**
 * Componente Principal da Tela de Refeições.
 * Exibe a lista de receitas, barra de busca e filtros por categoria.
 */
function Meals() {
  const navigate = useNavigate(); // <--- Hook de navegação
  
  // Estados para armazenar dados da API
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Estados de controle de interface
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Efeito inicial: Carrega as categorias e as primeiras refeições ao abrir a tela.
   */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const [mealsData, categoriesData] = await Promise.all([
          fetchMeals(),
          fetchCategories()
        ]);
        
        setMeals(mealsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  /**
   * Gerencia a busca por nome quando o usuário submete o formulário.
   * @param {React.FormEvent} e - Evento de submit do formulário.
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setSelectedCategory('');
      const data = await fetchMeals(searchTerm);
      setMeals(data || []);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Filtra as receitas ao clicar em uma categoria.
   * @param {string} category - Nome da categoria clicada.
   */
  const handleCategoryClick = async (category: string) => {
    setIsLoading(true);
    try {
      if (selectedCategory === category) {
        setSelectedCategory('');
        const data = await fetchMeals();
        setMeals(data || []);
      } else {
        setSelectedCategory(category);
        const data = await fetchByCategory(category);
        setMeals(data || []);
      }
    } catch (error) {
      console.error('Erro ao filtrar por categoria:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Redireciona para a tela de detalhes da receita.
   * @param {string} id - ID da receita clicada.
   */
  const handleMealClick = (id: string) => {
    navigate(`/meals/${id}`); // <--- A Mágica acontece aqui!
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal pb-20 font-sans">
      
      {/* Header Fixo com Busca */}
      <header className="bg-white p-6 shadow-sm border-b border-sand sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-secondary">
              Smart<span className="text-primary">Cook</span>
            </span>
          </div>

          <form onSubmit={handleSearch} className="w-full md:w-1/2 relative">
            <input
              type="text"
              placeholder="O que vamos cozinhar hoje?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 bg-gray-50 border border-sand rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors"
            >
              🔍
            </button>
          </form>
        </div>
      </header>

      {/* Lista de Categorias */}
      <div className="max-w-5xl mx-auto p-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat.strCategory}
              onClick={() => handleCategoryClick(cat.strCategory)}
              className={`
                px-6 py-2 rounded-full text-sm font-bold transition-all border
                ${selectedCategory === cat.strCategory
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-gray-500 border-sand hover:bg-gray-50 hover:border-primary'
                }
              `}
            >
              {cat.strCategory}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Resultados */}
      <main className="max-w-5xl mx-auto px-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-primary animate-pulse">
            <span className="text-4xl mb-4">🍳</span>
            <p className="font-bold">Preparando a cozinha...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-6 text-charcoal flex items-center gap-2">
              {selectedCategory ? `Categoria: ${selectedCategory}` : 'Receitas Recentes'}
              <span className="text-xs font-normal text-gray-400 bg-white px-2 py-1 rounded-full border border-sand">
                {meals.length} resultados
              </span>
            </h2>

            {meals.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                Nenhuma receita encontrada. Tente outro termo!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {meals.map((meal) => (
                  <div 
                    key={meal.idMeal}
                    onClick={() => handleMealClick(meal.idMeal)} // <--- Clique adicionado no CARD
                    className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-sand group cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-sm">
                        {meal.strCategory || selectedCategory || 'Geral'}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl text-charcoal mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {meal.strMeal}
                      </h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1 mb-4">
                        📍 {meal.strArea || 'Internacional'}
                      </p>
                      
                      <button className="w-full py-3 rounded-xl bg-gray-50 text-charcoal font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all">
                        Ver Receita Completa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Meals;