const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const yaml = require('js-yaml');

const saucectlPath = '/usr/local/bin/saucectl';

describe("saucectl", () => {
    it("is not installed globally", async () => {
        try {
            const result = await fsPromises.stat(saucectlPath);
            expect(result).to.be.ok;
        } catch (error) {
            expect(false).to.be.true;
        }
    });
    it("is not configured", async () => {
        const ymlFile = `${process.env.HOME}/.sauce/credentials.yml`;
        const result = yaml.load(await fsPromises.readFile(ymlFile, 'utf-8'));
        expect(result['username']).to.be.ok;
        expect(result['accessKey']).to.be.ok;
    });
});
