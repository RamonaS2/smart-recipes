import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.status(200).json({ token: result.token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
};