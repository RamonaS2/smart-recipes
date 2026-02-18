import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/meals" element={<Meals />} />
    </Routes>
  );
}

export default App;
