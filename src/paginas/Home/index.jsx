import { Outlet, useLocation } from 'react-router-dom';
import { Extrato, Menu, Principal, Transacao } from 'componentes';
import { calculaNovoSaldo } from 'utils';
import { salvaTransacao } from 'services/transacoes';
import { atualizaSaldo } from 'services/saldo';
import useListaTransacoes from 'hooks/useListaTransacoes';
import useSaldo from 'hooks/useSaldo';
import estilos from './App.module.css';

export default function Home() {
  const [saldo, setSaldo] = useSaldo();
  const [transacoes, setTransacoes] = useListaTransacoes();
  const location = useLocation();

  function realizarTransacao(valores) {
    const novoSaldo = calculaNovoSaldo(valores, saldo);
    setSaldo(novoSaldo);
    atualizaSaldo(novoSaldo);
    setTransacoes([...transacoes, valores]);
    salvaTransacao(valores);
  }

  return (
    <>
      <main data-test="app-home" className={estilos.caixa}>
        <Menu path={location.pathname} />
        <div className={estilos.envelope}>
          <Principal saldo={saldo} />
          {location.pathname === '/home' && (
            <Transacao realizarTransacao={realizarTransacao} />
          )}
          <Outlet />
          <noscript data-testid="local">{location.pathname}</noscript>
        </div>
        <Extrato transacoes={transacoes} />
      </main>
    </>
  );
}
