import express from 'express';
import cors from 'cors';
import loginRouter from './routes/loginRouter'; 

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Smart Recipes API is running! 🚀' });
});

export default app;