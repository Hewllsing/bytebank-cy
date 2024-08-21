import React from 'react';
import estilos from './Botao.module.css';

export default function Botao({
  texto,
  onClick,
  tipo = 'primario',
  acaoBotao,
}) {
  return (
    <button
      data-test={`botao-${acaoBotao}`}
      className={
        tipo === 'secundario' ? estilos.btn__secundario : estilos.btn__primario
      }
      onClick={onClick}
    >
      {texto}
    </button>
  );
}
