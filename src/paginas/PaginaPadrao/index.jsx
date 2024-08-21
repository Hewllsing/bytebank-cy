import Cabecalho from 'componentes/Cabecalho';
import Rodape from 'componentes/Rodape';
import { Outlet, useLocation } from 'react-router-dom';

export default function PaginaPadrao() {
  const location = useLocation();

  return (
    <div className="conteudo-pagina">
      <Cabecalho path={location.pathname} />
      <Outlet />
      {(location.pathname === '/' || location.pathname === '*') && <Rodape />}
    </div>
  );
}
