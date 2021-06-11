const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const yaml = require('js-yaml');

const artifactsFolderPath = '../artifacts';
const sauceConfigPath = '../.sauce/config.yml';

describe(".sauce/config.yml", () => {
    it("should have more than one test", async () => {
        const result = yaml.load(await fsPromises.readFile(sauceConfigPath, 'utf-8'));
        const suites = result['suites'];
        expect(suites).length.greaterThan(1);
    });
    it("should have a second test with a valid config", async () => {
        const result = yaml.load(await fsPromises.readFile(sauceConfigPath, 'utf-8'));
        const suites = result['suites'];
        expect(suites[1]['name']).to.be.ok;
        expect(suites[1]['browser']).to.be.ok;
        expect(suites[1]['platformName']).to.be.ok;
        expect(suites[1]['config']).to.be.ok;
        expect(suites[1]['config']['testFiles']).length.greaterThan(0);
    });
});
