import { Request, Response } from 'express';
import * as mealsService from '../services/mealsService';

/**
 * Gerencia as requisições HTTP relacionadas às operações de refeições.
 * Atua como intermediário entre a rota e o serviço de dados.
 */

/**
 * GET /meals
 * Retorna a lista de refeições. Suporta o parâmetro de query 'search'.
 * Exemplo de uso: /meals?search=cake
 * * @param {Request} req - Objeto de requisição do Express.
 * @param {Response} res - Objeto de resposta do Express.
 */
export const listMeals = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string || '';
    const meals = await mealsService.getMeals(search);
    return res.status(200).json(meals);
  } catch (error) {
    // Em produção, evitar expor o erro bruto. Logar internamente e retornar mensagem genérica.
    return res.status(500).json({ message: 'Erro Interno do Servidor ao listar refeições' });
  }
};

/**
 * GET /meals/categories
 * Retorna a lista de categorias disponíveis para filtro.
 */
export const listCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await mealsService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Erro Interno do Servidor ao listar categorias' });
  }
};

/**
 * GET /meals/filter
 * Filtra os resultados com base na categoria fornecida via query param.
 * Exemplo: /meals/filter?category=Seafood
 */
export const filterBy = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: 'O parâmetro "category" é obrigatório e deve ser uma string' });
    }

    const meals = await mealsService.filterByCategory(category);
    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json({ message: 'Erro Interno do Servidor ao filtrar refeições' });
  }
};