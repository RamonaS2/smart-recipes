import { Request, Response } from 'express';
import * as doneService from '../services/doneService';

export const getDoneRecipes = async (req: Request, res: Response) => {
  try {
    const email = req.params.email as string;
    const doneRecipes = await doneService.getDoneRecipes(email);
    return res.status(200).json(doneRecipes);
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const addDoneRecipe = async (req: Request, res: Response) => {
  try {
    const { email, recipeData } = req.body;
    const newDoneRecipe = await doneService.addDoneRecipe(email, recipeData);
    return res.status(201).json(newDoneRecipe);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};