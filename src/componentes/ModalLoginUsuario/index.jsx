import Botao from 'componentes/Botao';
import { useState } from 'react';
import api from 'services/api';
import estilos from './ModalLoginUsuario.module.css';
import ilustracaoLogin from './assets/ilustracao-login.svg';
import { validaDadosFormulario } from 'validacoes/validaFomulario';

export default function ModalLoginUsuario({
  aberta,
  aoFechar,
  aoEfetuarLogin,
  salvaNomeUsuario,
}) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const usuario = {
      email,
      senha,
    };

    const result = await validaDadosFormulario(usuario);
    if (!result.valid) {
      setErro({
        path: result.path,
        message: result.message,
      });
      return;
    }

    api
      .post('/public/login', usuario)
      .then((resposta) => {
        sessionStorage.setItem('token', resposta.data.access_token);
        setEmail('');
        setSenha('');
        setErro({
          path: '',
          message: '',
        });
        aoEfetuarLogin();
        const nomeUsuario = resposta.data.user.nome;
        salvaNomeUsuario(nomeUsuario);
      })
      .catch((erro) => {
        if (erro?.response?.data?.message) {
          setErro({
            path: 'message-erro',
            message: erro.response.data.message,
          });
        } else {
          alert(
            'Aconteceu um erro inesperado ao efetuar login! Contate o suporte'
          );
          aoFechar();
        }
      });
  };

  if (!aberta) {
    return <></>;
  }

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className={estilos.background__modal}
        onClick={aoFechar}
        aria-hidden="true"
      />
      ;
      <div className={estilos.janela__modal}>
        <button className={estilos.fechar__modal} onClick={aoFechar}>
          X
        </button>
        <div className={estilos.modal__container}>
          <img
            src={ilustracaoLogin}
            alt="pessoa ao lado de um dispositivo móvel"
          />
          {erro.path == 'message-erro' ? <span>{erro.message}</span> : ''}
          <p className={estilos.modal__descricao}>Login</p>
          <form onSubmit={onSubmit} className={estilos.modal__form}>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
                name="email"
                id="email"
                data-test="email-input"
                placeholder="Digite seu email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {erro.path === 'email' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="senha">
              Senha
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                data-test="senha-input"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              {erro.path === 'senha' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <Botao acaoBotao="enviar" texto="Acessar" />
          </form>
          <div className={estilos.link}>
            <a href="/">Esqueci minha senha!</a>
          </div>
        </div>
      </div>
    </>
  );
}
