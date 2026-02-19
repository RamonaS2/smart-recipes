/**
 * Interface para tipar a resposta da API de forma flexível.
 */
export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  strTags?: string;
  [key: string]: string | undefined; // Permite acessar chaves dinâmicas
}

/**
 * Interface para um ingrediente processado.
 */
export interface Ingredient {
  name: string;
  measure: string;
}

/**
 * Transforma os dados brutos da API (strIngredient1, strMeasure1...)
 * em uma lista limpa de objetos Ingredient.
 * @param meal - O objeto da receita vindo da API.
 * @returns Lista formatada de ingredientes.
 */
export const getIngredients = (meal: MealDetail | null): Ingredient[] => {
  if (!meal) return [];
  const ingredients: Ingredient[] = [];
  
  // A API suporta até 20 ingredientes
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      });
    }
  }
  return ingredients;
};