describe('Dashboard analysis', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
    });

    it('should show the line,echarts,statics and gantt charts', () => {
        cy.get('da-analysis-line').should('be.visible');
        cy.get('da-analysis-line').should('contain','Data Flow In A Week');

        cy.get('.da-analysis-echarts').should('be.visible');
        cy.get('.da-analysis-echarts').should('contain','Service Level Variation');
        cy.get('.da-analysis-echarts').should('contain','User Visiting');

        cy.get('da-statics').should('be.visible');
        cy.get('da-statics').should('contain','Requirement Type Tendency');

        cy.get('da-analysis-gantt').should('be.visible');
        cy.get('da-analysis-gantt').should('contain','Task Completed Situation');
    });
});

describe('Dashboard Monitor', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
        cy.visit('/pages/dashboard/monitor');

        cy.get(':nth-child(1) > .dl-col-xs-16').as('monitor');
        cy.get(':nth-child(1) > .dl-col-xs-8').as('rate');
        cy.get(':nth-child(2) > .dl-col-xs-16').as('distribution');
        cy.get(':nth-child(2) > .dl-col-xs-8').as('tendency');
    });

    it('should show Task Completion Monitor', () => {
        cy.get('@monitor').should('be.visible');
        cy.get('@monitor').should('contain','Task Completion Monitor');
    });

    it('should show Occupancy Rate', () => {
        cy.get('@rate').should('be.visible');
        cy.get('@rate').should('contain','Occupancy Rate');
    });

    it('should show User Distribution', () => {
        cy.get('@distribution').should('be.visible');
        cy.get('@distribution').should('contain','User Distribution');
    });

    it('should show the Tendency and Task Execution', () => {
        cy.get('@tendency').should('be.visible');
        cy.get('@tendency').should('contain','Tendency');
        cy.get('@tendency').should('contain','Task Execution');
    });
});

describe('Dashboard Workspace', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.get('.da-language-wrapper').click();
        cy.get(':nth-child(2) > .devui-dropdown-item').click();
        cy.get('.da-submit-button').click();
        cy.visit('/pages/dashboard/workspace');

        cy.get(':nth-child(1) > .dl-col-xs-16').as('first-panel');
        cy.get(':nth-child(1) > .dl-col-xs-8').as('second-panel');
        cy.get(':nth-child(2) > .dl-col-xs-16').as('third-panel');
        cy.get(':nth-child(2) > .dl-col-xs-8').as('fourth-panel');

    });

    it('should greet Admin to workspace', () => {
        cy.get('.da-content-banner-title').contains('Work Space');
        cy.get('.da-description').contains('Hello Admin, welcome to your work space！');
        cy.get('.da-description-subtitle').contains('Front-End Expert | DevUI-Committer');
    });

    it('should display all panels', () => {
        cy.get('@first-panel').should('be.visible');
        cy.get('@second-panel').should('be.visible');
        cy.get('@third-panel').should('be.visible');
        cy.get('@fourth-panel').should('be.visible');
    });

});