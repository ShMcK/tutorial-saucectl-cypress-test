const expect = require('chai').expect;
const fsPromises = require('fs').promises;
const cypressJson = '../cypress.json';

describe('cypress.json', function () {
    it('does not exist', async () => {
        try {
            const file = await fsPromises.readFile(cypressJson);
            expect(JSON.parse(file)).to.be.ok;
        } catch (error) {
            throw ('Errors', error);
        }
    });

    it('baseUrl does not point to the correct site', async () => {
        try {
            const file = await fsPromises.readFile(cypressJson);
            const obj = JSON.parse(file);
            expect(obj['baseUrl']).eq('https://www.saucedemo.com/v1/');
        } catch (error) {
            throw ('Errors', error);
        }
    });
});
