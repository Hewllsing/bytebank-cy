import { Link } from 'react-router-dom';
import estilos from './MenuLateral.module.css';

const listaMenuLateral = [
  { link: 'Início', href: '/home' },
  { link: 'Cartões', href: '/home/cartoes' },
  { link: 'Serviços', href: '/home/servicos' },
  { link: 'Investimentos', href: '/home/investimentos' },
];

export default function MenuLateral({
  path,
  toggleHamburguer,
  aoEfetuarLogout,
}) {
  return (
    <nav data-test="menu-lateral" className={estilos.menu}>
      <button
        className={estilos.fechar__modal}
        onClick={() => toggleHamburguer()}
      >
        X
      </button>
      {listaMenuLateral.map((item, indice) => {
        return (
          <div key={item.href} className={estilos.item}>
            <Link
              to={item.href}
              className={`${estilos.link} ${
                path === item.href && estilos.linkAtivo
              }`}
            >
              {item.link}
            </Link>
            {indice !== listaMenuLateral.length - 1 && (
              <div className={estilos.divisor} />
            )}
          </div>
        );
      })}
      <div className={estilos.item}>
        <div className={estilos.divisor} />
        <Link to="/" className={estilos.link} onClick={() => aoEfetuarLogout()}>
          Sair
        </Link>
      </div>
    </nav>
  );
}
