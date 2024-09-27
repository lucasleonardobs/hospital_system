
describe("Testes da tela inicial", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/login");
        cy.get("input[name=email]").type("lukita");
        cy.get("input[name=password]").type("111");
        cy.get('[name="login-btn"]').click();
    });
  
    it("Clicar em Lista de pacientes não deve gerar erros", () => {
        cy.get('[name="btn-patient-list"]').click();
        cy.get("[data-error]").should("not.exist");
    });

    it("Clicar em Fila de espera não deve gerar erros", () => {
        cy.get('[name="btn-patient"]').click();
        cy.get("[data-error]").should("not.exist");
    });

    it("Clicar em Marcação de exames não deve gerar erros", () => {
        cy.get('[name="btn-exams"]').click();
        cy.get("[data-error]").should("not.exist");
    });

    it("Clicar em Relatórios médicos não deve gerar erros", () => {
        cy.get('[name="btn-reports"]').click();
        cy.get("[data-error]").should("not.exist");
    });

    it("Deslogar deve retornar para a página inicial", () => {
        cy.get('[name="logout"]').click();
        cy.url().should('eq', 'http://localhost:4200/login');
    });
  });

