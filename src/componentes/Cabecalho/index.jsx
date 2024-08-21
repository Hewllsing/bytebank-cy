/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ModalCadastroUsuario,
  ModalLoginUsuario,
  Botao,
  BurguerIcon,
  MenuLateral,
} from 'componentes';

import { ReactComponent as Logo } from 'assets/bytebank.svg';
import avatarUsuario from 'assets/avatar.svg';
import estilos from './Cabecalho.module.css';

export default function Cabecalho({ path }) {
  const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
  const [modalLoginAberta, setModalLoginAberta] = useState(false);
  const [burguerOpen, setBurguerOpen] = useState(false);
  const [nomeUsuario, setNomeUsuario] = useState('');

  let navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  const [usuarioEstaLogado, setUsuarioEstaLogado] = useState(token != null);

  const toggleHamburguer = () => {
    setBurguerOpen(!burguerOpen);
  };

  const aoEfetuarLogin = () => {
    setModalLoginAberta(false);
    setUsuarioEstaLogado(true);
    navigate('/home');
  };

  const aoEfetuarLogout = () => {
    setUsuarioEstaLogado(false);
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const salvaNomeUsuario = (nomeUsuario) => {
    setNomeUsuario(nomeUsuario);
  };

  return (
    <header className={estilos.cabecalho}>
      <div className={estilos.container}>
        <Logo />
        {!usuarioEstaLogado && (
          <>
            <div className={estilos.botoes}>
              <Botao
                acaoBotao="cadastro"
                texto="Abrir minha conta"
                onClick={() => setModalCadastroAberta(true)}
              />
              <ModalCadastroUsuario
                aberta={modalCadastroAberta}
                aoFechar={() => setModalCadastroAberta(false)}
              />
              <Botao
                acaoBotao="login"
                texto="Já tenho conta"
                tipo="secundario"
                onClick={() => setModalLoginAberta(true)}
              />
              <ModalLoginUsuario
                aberta={modalLoginAberta}
                aoFechar={() => setModalLoginAberta(false)}
                aoEfetuarLogin={aoEfetuarLogin}
                salvaNomeUsuario={salvaNomeUsuario}
              />
            </div>
          </>
        )}
        {usuarioEstaLogado && (
          <div className={estilos.usuario}>
            <div className={estilos.usuario__info}>
              <p>{`Olá, ${nomeUsuario}`}</p>
              <img src={avatarUsuario} alt="Ícone de um avatar de usuário" />
              <Botao
                acaoBotao="sair"
                texto="Sair"
                onClick={() => aoEfetuarLogout()}
              />
            </div>
            <div className={estilos.hamburguerIcon} onClick={toggleHamburguer}>
              <BurguerIcon />
              {burguerOpen && (
                <MenuLateral
                  path={path}
                  toggleHamburguer={toggleHamburguer}
                  aoEfetuarLogout={aoEfetuarLogout}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
