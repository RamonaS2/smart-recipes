import { Request, Response } from 'express';
import * as authService from '../services/authService';

/**
 * Controlador para o Login.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const data = await authService.loginRequest(email, password);
    return res.status(200).json(data);
  } catch (error: any) {
    // Se a senha estiver errada, o service joga um erro que capturamos aqui
    return res.status(401).json({ message: error.message });
  }
};

/**
 * Controlador para o Cadastro (Registro).
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
    }

    const data = await authService.registerUser(email, password);
    return res.status(201).json(data);
  } catch (error: any) {
    // Se o e-mail já existir
    return res.status(409).json({ message: error.message });
  }
};