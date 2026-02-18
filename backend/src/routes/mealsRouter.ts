import { Router } from 'express';
import * as mealsController from '../controllers/mealsController';

const router = Router();

// Rota GET /meals
router.get('/', mealsController.getAll);

export default router;