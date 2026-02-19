import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import RecipeDetails from './pages/RecipeDetails';
import InProgress from './pages/InProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/meals" element={<Meals />} />

      {/* Rota Dinâmica (:id pega qualquer código que vier na URL) */}
      <Route path="/meals/:id" element={<RecipeDetails />} />

      {/* Nova Rota de Progresso */}
      <Route path="/meals/:id/in-progress" element={<InProgress />} />
    </Routes>
  );
}

export default App;
