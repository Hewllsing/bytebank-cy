describe('Formulário Cadastro', ()=>{
    beforeEach(()=>{
      cy.visit('/')
    })
  
    it('Usuário deve conseguir se cadastrar com sucesso', ()=>{
      cy.getByData('botao-cadastro').click()
      cy.getByData('nome-input').type('Leo Souza')
      cy.getByData('email-input').type('leo@alura.com')
      cy.getByData('senha-input').type('123456')
      cy.getByData('checkbox-input').click()
      cy.getByData('botao-enviar').click()
      cy.getByData('mensagem-sucesso').should('exist').and('have.text', 'Usuário cadastrado com sucesso!')
    })
  })