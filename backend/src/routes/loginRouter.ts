import { Router } from 'express';
import * as authController from '../controllers/authController';

const loginRouter = Router();

loginRouter.post('/', authController.login);

export default loginRouter;