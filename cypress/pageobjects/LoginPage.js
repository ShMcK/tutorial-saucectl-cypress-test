// Page Objects
class LoginPage {
    get screen() {
        return cy.get('#login_button_container');
    }

    get username() {
        return cy.get('#user-name');
    }

    get password() {
        return cy.get('#password');
    }

    get loginButton() {
        return cy.get('.btn_action');
    }

    get errorMessage() {
        return cy.get('[data-test="error"]');
    }

}

export default new LoginPage();