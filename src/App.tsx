import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/meals" element={<h1>Tela de Comidas (Em breve)</h1>} />
    </Routes>
  );
}

export default App;
