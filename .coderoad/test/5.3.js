const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const yaml = require('js-yaml');

const sauceConfigPath = '../.sauce/config.yml';

describe("sauce/config.yml", () => {
    it("does not have a suite", async () => {
        const result = yaml.load(await fsPromises.readFile(sauceConfigPath, 'utf-8'));
        const suites = result['suites'];
        expect(suites).length.greaterThan(0);
    });
    it("should have an example suite with name, browser, platformName, screenResolution, config", async () => {
        const result = yaml.load(await fsPromises.readFile(sauceConfigPath, 'utf-8'));
        const suites = result['suites'];
        expect(suites[0]['name']).to.be.ok;
        expect(suites[0]['browser']).to.be.ok;
        expect(suites[0]['platformName']).to.be.ok;
        expect(suites[0]['screenResolution']).to.be.ok;
        expect(suites[0]['config']).to.be.ok;
        expect(suites[0]['config']['testFiles']).length.greaterThan(0);
    });
});