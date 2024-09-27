
describe("Testes de login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:4200/login");
    });
  
    it("Não é possivel tentar logar sem todos os campos preenchidos", () => {
        cy.get('[name="login-btn"]').should('be.disabled')
    });

    it("Botão de login possui texto 'Login'", () => {
        cy.get('[name="login-btn"]').contains("Login")
    });

    it("Login com dados válidos não gera mensagens de erro", () => {
        cy.get("input[name=email]").type("lukita");
        cy.get("input[name=password]").type("111");
        cy.get('[name="login-btn"]').click();
        cy.get("[data-error]").should("not.exist");
      });
  });

