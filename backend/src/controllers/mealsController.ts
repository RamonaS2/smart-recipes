import { Request, Response } from 'express';
import * as mealsService from '../services/mealsService';

/**
 * Controlador para listar as receitas.
 * Retorna status 200 e o array de comidas.
 */
export const getAll = async (_req: Request, res: Response) => {
  try {
    const meals = await mealsService.getAllMeals();
    return res.status(200).json(meals);
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno ao buscar receitas.' });
  }
};