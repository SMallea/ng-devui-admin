describe('Abnormal tests', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
    });

    it('Should display error 403', () => {
        cy.visit('/pages/abnormal/abnormal403');
        cy.get('.da-abnormal-img > img').should('be.visible');
        cy.get('.da-abnormal-title').contains('403');
        cy.get('.da-abnormal-description').contains("Sorry, you don't have access to this page.");
    });

    it('Should display error 404', () => {
        cy.visit('/pages/abnormal/abnormal404');
        cy.get('.da-abnormal-img > img').should('be.visible');
        cy.get('.da-abnormal-title').contains('404');
        cy.get('.da-abnormal-description').contains("Sorry, the page you visited does not exist.");
    });

    it('Should display error 500', () => {
        cy.visit('/pages/abnormal/abnormal500');
        cy.get('.da-abnormal-img > img').should('be.visible');
        cy.get('.da-abnormal-title').contains('500');
        cy.get('.da-abnormal-description').contains("Sorry, the server is reporting an error.");
    });

    it('Should return to dashboard analysis when return home button is clicked', () => {
        cy.visit('/pages/abnormal/abnormal500');
        cy.get('.devui-btn').click();
        cy.location('pathname').should('contain', '/pages/dashboard/analysis');
    });
  
})