import { Router } from 'express';
import * as doneController from '../controllers/doneController';

const router = Router();

// Rota para buscar receitas concluídas (GET /done-recipes/:email)
router.get('/:email', doneController.getDoneRecipes);

// Rota para guardar uma receita concluída (POST /done-recipes)
router.post('/', doneController.addDoneRecipe);

export default router;