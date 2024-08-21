import React from 'react';
import ilustracaoBanner from 'assets/ilustracao-banner.svg';
import estilos from './Inicio.module.css';
import presente from 'assets/presente.svg';
import saque from 'assets/saque.svg';
import estrela from 'assets/estrela.svg';
import dispositivo from 'assets/dispositivo.svg';

export default function Inicio() {
  return (
    <>
      <div className={estilos.container}>
        <div className={estilos.conteudo}>
          <div className={estilos.banner}>
            <h1 data-test="titulo-principal">
              Experimente mais liberdade no controle da sua vida financeira.
              Crie sua conta com a gente!
            </h1>
            <img
              src={ilustracaoBanner}
              alt="Gráficos e uma pessoa com dinheiro na mão"
            />
          </div>
          <div className={estilos.vantagens}>
            <h2>Vantagens do nosso banco:</h2>
            <div className={estilos.vantagens__itens}>
              <div className={estilos.vantagens__item}>
                <img src={presente} alt="ícone de um presente" />
                <h3>Conta e cartão gratuitos</h3>
                <p>
                  Isso mesmo, nossa conta é digital, sem custo fixo e mais que
                  isso: sem tarifa de manutenção.
                </p>
              </div>
              <div className={estilos.vantagens__item}>
                <img src={saque} alt="ícone de uma mão segurando um dinheiro" />
                <h3>Saques sem custo</h3>
                <p>
                  Você pode sacar gratuitamente 4x por mês de qualquer Banco
                  24h.
                </p>
              </div>
              <div className={estilos.vantagens__item}>
                <img src={estrela} alt="ícone de uma estrela" />
                <h3>Programa de pontos</h3>
                <p>
                  Você pode acumular pontos com suas compras no crédito sem
                  pagar mensalidade!
                </p>
              </div>
              <div className={estilos.vantagens__item}>
                <img
                  src={dispositivo}
                  alt="ícone de um dispositivo como notebook"
                />
                <h3>Seguro Dispositivos</h3>
                <p>
                  Seus dispositivos móveis (computador e laptop) protegidos por
                  uma mensalidade simbólica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
