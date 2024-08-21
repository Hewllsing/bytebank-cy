import React from 'react';
import { Link } from 'react-router-dom';
import estilos from './Menu.module.css';

const listaMenu = [
  { link: 'Início', href: '/home' },
  { link: 'Cartões', href: '/home/cartoes' },
  { link: 'Serviços', href: '/home/servicos' },
  { link: 'Investimentos', href: '/home/investimentos' },
];

export default function Menu({ path }) {
  return (
    <nav className={estilos.menu}>
      {listaMenu.map((item, indice) => {
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
            {indice !== listaMenu.length - 1 && (
              <div className={estilos.divisor} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
