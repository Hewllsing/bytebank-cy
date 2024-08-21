import * as yup from 'yup';

async function validaDadosFormulario(user) {
  let schemaLogin = yup.object().shape({
    email: yup
      .string()
      .email('O email digitado é inválido')
      .required('O campo email é obrigatório'),
    senha: yup.string().required('O campo de senha é obrigatório'),
  });

  let schemaCadastro = yup.object().shape({
    nome: yup.string().required('O campo de nome é obrigatório'),
    email: yup
      .string()
      .email('O email digitado é inválido')
      .required('O campo email é obrigatório'),
    senha: yup.string().required('O campo de senha é obrigatório'),
  });

  try {
    if (user.nome === '') await schemaCadastro.validate(user);
    if (!user.nome) await schemaLogin.validate(user);

    return { valid: true, path: '', message: 'Validação foi um sucesso!' };
  } catch (erro) {
    return { valid: false, path: erro.path, message: erro.errors };
  }
}
export { validaDadosFormulario };
