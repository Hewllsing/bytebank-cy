import estilos from './ModalCadastroUsuario.module.css';
import { useState } from 'react';
import api from 'services/api';
import ilustracaoCadastro from './assets/ilustracao-cadastro.svg';
import Botao from 'componentes/Botao';
import { validaDadosFormulario } from 'validacoes/validaFomulario';

export default function ModalCadastroUsuario({ aberta, aoFechar }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const usuario = {
      nome,
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
      .post('/public/cadastrar', usuario)
      .then(() => {
        setErro({
          path: 'message-sucess',
          message: 'Usuário cadastrado com sucesso!',
        });
        setNome('');
        setEmail('');
        setSenha('');
        setTimeout(() => {
          aoFechar();
          setErro({
            path: '',
            message: '',
          });
        }, 1000);
      })
      .catch((erro) => {
        setErro({
          path: 'email',
          message: erro?.response?.data?.message,
        });
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
      <div className={estilos.janela__modal}>
        <button className={estilos.fechar__modal} onClick={aoFechar}>
          X
        </button>
        <div className={estilos.modal__container}>
          <img
            src={ilustracaoCadastro}
            alt="pessoa ao lado de um notebook com cadeado"
          />
          {erro.path == 'message-sucess' ? (
            <span data-test="mensagem-sucesso">{erro.message}</span>
          ) : (
            ''
          )}
          <p className={estilos.modal__descricao}>
            Preencha os campos abaixo para criar sua conta corrente!
          </p>
          <form onSubmit={onSubmit} className={estilos.modal__form}>
            <label htmlFor="nome">
              Nome
              <input
                type="text"
                id="nome"
                data-test="nome-input"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              {erro.path === 'nome' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <label htmlFor="email">
              E-mail
              <input
                type="email"
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
                data-test="senha-input"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
              {erro.path === 'senha' ? (
                <span data-test="mensagem-erro">{erro.message}</span>
              ) : (
                ''
              )}
            </label>
            <div className={estilos.termo__container}>
              <input
                data-test="checkbox-input"
                className={estilos.checkbox}
                type="checkbox"
              />
              <p>
                Li e estou ciente quanto às condições de tratamento dos meus
                dados conforme descrito na Política de Privacidade do banco.
              </p>
            </div>
            <Botao acaoBotao="enviar" texto="Criar conta" />
          </form>
        </div>
      </div>
    </>
  );
}
