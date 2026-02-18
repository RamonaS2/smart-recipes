import express from 'express';
import cors from 'cors';
import loginRouter from './routes/loginRouter';
import mealsRouter from './routes/mealsRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/meals', mealsRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Smart Recipes API is running! 🚀' });
});

export default app;