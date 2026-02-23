import { Router } from 'express';
import * as authController from '../controllers/authController';

const loginRouter = Router();

loginRouter.post('/', authController.login);
loginRouter.post('/register', authController.register);

export default loginRouter;