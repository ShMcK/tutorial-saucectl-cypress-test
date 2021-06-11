const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const sinon = require("sinon");

const LoginPagePath = "../cypress/pageobjects/LoginPage.js";
const LoginPage = require("../../cypress/pageobjects/LoginPage").default;

global.cy = {
    get: () => ({
        type: () => { },
        click: () => { },
    })
};

global.spy = sinon.spy(global.cy, "get");

describe("LoginPage.js", function () {
    it("doesn't exist", async () => {
        try {
            const file = await fsPromises.readFile(LoginPagePath, "utf-8");
            expect(file).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("doesn't have a proper loginButton method", () => {
        try {
            LoginPage.screen;
            const loginButtonContainer = spy.calledWith(
                "#login_button_container"
            );
            expect(loginButtonContainer).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("doesn't have a proper username method", () => {
        try {
            LoginPage.username;
            const loginUsername = spy.calledWith("#user-name");
            expect(loginUsername).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("doesn't have a proper password method", () => {
        try {
            LoginPage.password;
            const loginPassword = spy.calledWith("#password");
            expect(loginPassword).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("loginButton method doesn't call .btn_action'", () => {
        try {
            LoginPage.loginButton;
            const btnAction = spy.calledWith(".btn_action");
            expect(btnAction).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("errorMessage doesn't call the data-test error", () => {
        try {
            LoginPage.errorMessage;
            const errorMessage = spy.calledWith('[data-test="error"]');
            expect(errorMessage).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

});

