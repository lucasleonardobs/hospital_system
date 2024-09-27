
describe("Testes da tela de exames médicos", () => {
    beforeEach(() => {
        cy.visit("http://localhost:4200/login");
        cy.get("input[name=email]").type("lukita");
        cy.get("input[name=password]").type("111");
        cy.get('[name="login-btn"]').click();
        cy.get('[name="btn-exams"]').click();
    });
  
    it("Clicar em Novo paciente deve gerar a exibição de um modal", () => {
        cy.get('[data-cy=new-exam-btn]').click();
        cy.get('#mat-dialog-0').should('be.visible');
    });

    /*
    it("Cadastrar um novo exame não deve ser possível sem todos os campos preenchidos", () => {
        cy.get('[data-cy=new-exam-btn]').click();
        cy.get("input[name=cpf]").type("13051905878");
        cy.get('[data-cy=search-btn]').click();
        cy.get('[data-cy=submit-btn]').should('be.disabled');
    });
    */

    it("Cadastrar um novo exame corretamente não deve gerar erros", () => {
        cy.get('[data-cy=new-exam-btn]').click();
        cy.get("input[name=cpf]").type("13051905878");
        cy.get('[data-cy=search-btn]').click();
        cy.get('[data-cy=exam-select]').click().get('mat-option').contains('Tomografia').click();
        cy.get('[data-cy=doctor-select]').click().get('mat-option').contains('Abelho').click();
        cy.get("mat-datepicker-toggle").click();
        cy.get('.actions > .mat-focus-indicator > .mat-button-wrapper > .mat-icon').click();
        cy.get('[data-cy=submit-btn]').click();
        cy.get("[data-error]").should("not.exist");
    });

    it("Visualizar um exame deve abrir uma dialog box com informações sobre ele ", () => {
        cy.get('[data-cy=acoes]').last().click({force: true}).as('actionsBtn');

        cy.get('@actionsBtn').should('be.visible');
        cy.get('@actionsBtn').click({ force: true });

        cy.get('[data-cy=view]').last().click({force: true});

        cy.get('#mat-dialog-0').should("be.visible");

        cy.get("[data-error]").should("not.exist");
    }); 

    it("Deletar um exame deve removê-lo da lista", () => {
        cy.get('[data-cy=acoes]').last().click({force: true}).as('actionsBtn');

        cy.get('@actionsBtn').should('be.visible');
        cy.get('@actionsBtn').click({ force: true });

        cy.get('[data-cy=delete]').last().click({force: true});


        cy.get('.footer-buttons > .mat-primary').click();


        cy.get("[data-error]").should("not.exist");


    }); 
  });
