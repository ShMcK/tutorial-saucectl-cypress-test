const expect = require('chai').expect;
const fsPromises = require('fs').promises;

describe('login.spec.js', () => {
    let file
    before(async () => {
        try {
            const path = '../cypress/integration/login.spec.js'
            file = await fsPromises.readFile(path, 'utf-8');
            expect(file).to.be.ok;
        } catch (error) {
            throw ('Errors', error);
        }
    })
    it('should have a test for the LoginPage screen visibility', () => {
        const result = file.match(/it.+\n\s+LoginPage.screen.should\([\'\"]be.visible[\'\"]\)/)
        expect(!!result).to.be.ok
    })

    it('should have a test for logging in to the SwagOverviewPage', () => {
        const result = file.match(/it.+\n\s+LoginPage.signIn\(LOGIN_USERS\.STANDARD\);?\n\s+SwagOverviewPage.screen.should\(['"]be.visible['"]\)/)
        expect(!!result).to.be.ok
    })
})