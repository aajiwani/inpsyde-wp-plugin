describe("Wordpress Checkup", () => {
    it('Checks for a successful installation', () => {
        const wordpress_host = Cypress.env('wordpress_host');
        cy.visit(`http://${wordpress_host}`);
        cy.get('.entry-title > a:nth-child(1)').contains('Hello world!');
    });

    it('Checks for successful login with username and password', () => {
        const wordpress_host = Cypress.env('wordpress_host');
        const wordpress_user = Cypress.env('wordpress_user');
        const wordpress_pass = Cypress.env('wordpress_pass');
        cy.visit(`http://${wordpress_host}/wp-admin`);
        cy.get('#user_login').type(wordpress_user);
        cy.get('#user_pass').type(wordpress_pass);
        cy.get('#wp-submit').click();
        // Make sure the login is with the same user
        cy.get('span.display-name:nth-child(1)').contains(wordpress_user);
        // Make sure the dashboard is the page we are at
        cy.get('.wrap > h1:nth-child(1)').contains('Dashboard');
    });
});