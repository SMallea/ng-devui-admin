describe('Login features', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
    it('should have chinese language by default', () => {  
      cy.get('.da-language-wrapper').click();
      cy.get(':nth-child(1) > .devui-dropdown-item').click();
      cy.get('.da-coperation').contains('出品');
    });
    
    it('should show language dropdown menu', () => {
      cy.get('.da-language-wrapper').click();
      cy.get('.devui-dropdown-item').should('be.visible');
    });
  
    it('should change language to english', () => {
      cy.get('.da-language-wrapper').click();
      cy.get(':nth-child(2) > .devui-dropdown-item').click();
      cy.get('.da-coperation').contains('Presented');
    });
  
    it('should show password hidden and visible when button clicked', () => {
      
      cy.get('[name=password]').should('have.attr', 'type', 'password');
      cy.get('.icon').click();
      cy.get('[name=password]').should('have.attr', 'type', 'text');
    });
  
  })
  describe('Sign in', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('should login to dashboard with the Account Login credentials', () => {
      const username = 'Admin';
      const password = 'DevUI.admin';
      cy.get('[name=userName]').clear();
      cy.get('[name=password]').clear();
      cy.get('[name=userName]').type(username);
      cy.get('[name=password]').type(password);
      cy.get('.da-submit-button').click();
      cy.location('pathname').should('contain', '/pages/dashboard/analysis');
    });
  
    it('should login to dahsboard with the Email Login credentials', () => {
      const email = 'admin@devui.com';
      const password = 'devuiadmin';
      cy.get('.da-language-wrapper').click();
      cy.get(':nth-child(2) > .devui-dropdown-item').click();
      cy.get('#tab2 > a').click();
      cy.get('.devui-form-horizontal').should('not.contain','Username');
      cy.get('.devui-form-horizontal').should('contain','Email')
      cy.get('[name=userEmail]').clear();
      cy.get('[name=emailPassword]').clear();
      cy.get('[name=userEmail]').type(email);
      cy.get('[name=emailPassword]').type(password);
      cy.get('.da-submit-button').click();
      cy.location('pathname').should('contain', '/pages/dashboard/analysis');
    });
  });
  
  describe('Sign Up', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('.da-language-wrapper').click();
      cy.get(':nth-child(2) > .devui-dropdown-item').click();
      cy.get('.da-other > a').click();
      cy.get('.devui-form-control-container > div > .ng-untouched').as('email');
      cy.get(':nth-child(2) > .devui-form-controls > .devui-form-control-container > .ng-untouched').as('password');
      cy.get(':nth-child(3) > .devui-form-controls > .devui-form-control-container > .ng-untouched').as('confirm');
      cy.get('.da-submit-button').as('register');
    });
  
    it('should navigate to "/register" when you click the "Sign Up" link', () => {
      cy.location('pathname').should('contain', 'register');
    });
  
    it('should require an email', () => {
      cy.get('@register').click();
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','The value cannot be empty.')
    });
  
    it('should require that the email actually be an email address', () => {
      cy.get('@email').type('notanemail');
      cy.get('@register').click();
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','Email format verification failed.');
    });
  
    it('should require a password when the email is present', () => {
      cy.get('@email').type('valid@email.com{enter}');
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','The value cannot be empty.');
    });
  
    it('should require a password to have at least 6 character', () => {
      cy.get('@email').type('valid@email.com');
      cy.get('@password').type('123');
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','The length cannot be less than 6.');
    });
  
    it('should require to confirm password when email and password are present', () => {
      cy.get('@email').type('valid@email.com');
      cy.get('@password').type('123456{enter}');
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','The value cannot be empty.');
    });
  
    it('should require the confirm password to be the same as the one in password', () => {
      cy.get('@email').type('valid@email.com');
      cy.get('@password').type('123456');
      cy.get('@confirm').type('123');
      cy.get('.devui-popover-main-content').should('be.visible').and('contain','Ensure that the two passwords are the same.');
    });
  
    it('should succesfully register and go back to /login page', () => {
      cy.get('@email').type('valid@email.com');
      cy.get('@password').type('123456');
      cy.get('@confirm').type('123456');
      cy.get('@register').click();
      cy.get('#register-result').should('contain','Registration success');
      cy.location('pathname').should('contain', 'login');
    });
  
    it('should go back to legin when "Already have an account?" link is clicked ', () => {
      cy.get('.da-other').click();
      cy.location('pathname').should('contain', 'login');
    });
  
  })