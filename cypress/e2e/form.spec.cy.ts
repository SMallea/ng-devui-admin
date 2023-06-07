describe('Basic Form test', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
        cy.visit('/pages/form/basic-form');
    });

    it('should display mandatory fields when submit in blank', () => {
        cy.get('.devui-btn').click();
        cy.get('.devui-popover-content').should('be.visible');
        cy.get('.devui-popover-content').should('contain','The value cannot be empty.')         
    });

    it('should show all the input spaces', () => {
        cy.get('[name="projectName"]').should('be.visible');
        cy.get('[selector="projectOwner"]').should('be.visible');
        cy.get('[selector="projectExecutor"]').should('be.visible');
        cy.get('[name="dp"]').should('be.visible');
        cy.get('[name="projectDescription"]').should('be.visible');
        cy.get('[selector="radio-button"]').should('be.visible');
        cy.get('[selector="checkboxes"]').should('be.visible');
    });
});

describe(' Form layout test', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
        cy.visit('/pages/form/form-layout');
    });

    it('should display error messages when registry button pressed in vertical form', () => {
        cy.get('.devui-form-vertical > .devui-form-operation > .mr-element-spacing > .devui-btn').click();
        cy.get(':nth-child(1) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .contains('The value cannot be empty.');
        cy.get(':nth-child(2) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .contains('The value cannot be empty.');
        cy.get(':nth-child(3) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .contains('The value cannot be empty.');
    });

    it('should erase error messages when registry button pressed ans then reset', () => {
        cy.get('.devui-form-vertical > .devui-form-operation > .mr-element-spacing > .devui-btn').click();
        cy.get('.devui-form-reset > .devui-btn').click();
        cy.get(':nth-child(1) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .should('not.exist');
        cy.get(':nth-child(2) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .should('not.exist');
        cy.get(':nth-child(3) > .devui-form-controls > .devui-form-control-inner-content > .devui-form-message > .devui-form-message-text > span')
        .should('not.exist');
    });

    it('should display modal form', () => {
        cy.get('da-modal-form > d-button > .devui-btn').click();
        cy.get('#dialog-service').should('be.visible');
        cy.get('[ng-reflect-bs-style="stress"] > .devui-btn').click();
        cy.get('#dialog-service').should('not.exist');         
    });
});

describe('Dynamic Form test', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
        cy.visit('/pages/form/dynamic-form');

        cy.get(':nth-child(1) > .devui-form-controls > .devui-form-control-container > .ng-star-inserted > .ng-invalid').as('projectName');
        cy.get(':nth-child(2) > .devui-form-controls > .devui-form-control-container > da-select-widget.ng-star-inserted > .ng-invalid > .devui-dropdown-origin > [tabindex="0"] > .devui-form-control')
        .as('owner');
        cy.get(':nth-child(3) > .devui-form-controls > .devui-form-control-container > da-select-widget.ng-star-inserted > .ng-invalid > .devui-dropdown-origin > [tabindex="0"] > .devui-form-control')
        .as('executor');
        cy.get('.devui-toggle-menu-search > .devui-form-control').as('labels')
        cy.get(':nth-child(5) > .devui-form-controls > .devui-form-control-container').as('toggle');
        cy.get('.devui-checkbox-list-inline').as('execution-time');
    });

    it('should display mandatory fields when submit in blank', () => {
        cy.get('.devui-btn').click();
        cy.get('.devui-toast-item').should('be.visible');
        cy.get('.devui-toast-item').should('contain', 'Check whether all validation items pass.');
    });

    it('should show all the input spaces', () => {
        cy.get('@projectName').should('be.visible');
        cy.get('@owner').should('be.visible');
        cy.get('@executor').should('be.visible');
        cy.get('@toggle').should('be.visible');
        cy.get('@labels').should('be.visible');
        cy.get('@execution-time').should('be.visible');
    });
});
