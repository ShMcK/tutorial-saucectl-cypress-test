const expect = require('chai').expect;
const fsPromises = require('fs').promises;
const constantsJs = '../cypress/support/constants.js';
const constants = require('../../cypress/support/constants')

describe('constants.js', () => {
    it('file exists', async () => {
        try {
            const file = await fsPromises.readFile(constantsJs, 'utf-8');
            expect(file).to.be.ok;
        } catch (error) {
            throw ('Errors', error);
        }
    });

    it('should have LOGIN_USERS exported', () => {
        expect(constants.LOGIN_USERS).to.be.ok;
    })

    it('should have LOGIN_USERS LOCKED with a username and password', () => {
        const locked = constants.LOGIN_USERS.LOCKED
        expect(locked).to.deep.equal({
            username: 'locked_out_user',
            password: 'secret_sauce',
        })
    })

    it('should have LOGIN_USERS STANDARD with a username and password', () => {
        const standard = constants.LOGIN_USERS.STANDARD
        expect(standard).to.deep.equal({
            username: 'standard_user',
            password: 'secret_sauce',
        })
    })
});