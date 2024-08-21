import { Route, Routes } from 'react-router-dom';
import PaginaPadrao from 'paginas/PaginaPadrao';
import Cartoes from 'componentes/Cartoes';
import Investimentos from 'componentes/Investimentos';
import Servicos from 'componentes/Servicos';
import Pagina404 from 'paginas/Pagina404';
import Home from 'paginas/Home';
import Inicio from 'paginas/Inicio';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PaginaPadrao />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />}>
          <Route path="cartoes" element={<Cartoes />} />
          <Route path="investimentos" element={<Investimentos />} />
          <Route path="servicos" element={<Servicos />} />
        </Route>
      </Route>
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  );
}
