import { Request, Response } from 'express';
import * as favoriteService from '../services/favoriteService';

export const getFavorites = async (req: Request, res: Response) => {
  try {
    // Garantimos ao TypeScript que o email que vem da URL é uma string
    const email = req.params.email as string; 
    
    const favorites = await favoriteService.getFavorites(email);
    return res.status(200).json(favorites);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { email, recipeData } = req.body;
    const newFavorite = await favoriteService.addFavorite(email, recipeData);
    return res.status(201).json(newFavorite);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    // Garantimos ao TypeScript que ambos são strings
    const email = req.params.email as string;
    const recipeId = req.params.recipeId as string;
    
    await favoriteService.removeFavorite(email, recipeId);
    return res.status(204).send();
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};