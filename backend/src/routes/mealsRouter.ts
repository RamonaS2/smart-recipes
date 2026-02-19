import { Router } from 'express';
import * as mealsController from '../controllers/mealsController';

const router = Router();

/**
 * Definições de rotas para o endpoint /meals.
 * Mapeia os métodos HTTP para os métodos do Controller.
 */

router.get('/', mealsController.listMeals);
router.get('/categories', mealsController.listCategories);
router.get('/filter', mealsController.filterBy);

// Rota dinâmica (ID) deve ser a última para não conflitar com as anteriores
router.get('/:id', mealsController.getById);

export default router;