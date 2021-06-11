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
});
