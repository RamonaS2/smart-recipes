import { Router } from 'express';
import * as favoriteController from '../controllers/favoriteController';

const router = Router();

// Rota para buscar favoritos (GET /favorites/:email)
router.get('/:email', favoriteController.getFavorites);

// Rota para adicionar favorito (POST /favorites)
router.post('/', favoriteController.addFavorite);

// Rota para remover favorito (DELETE /favorites/:email/:recipeId)
router.delete('/:email/:recipeId', favoriteController.removeFavorite);

export default router;