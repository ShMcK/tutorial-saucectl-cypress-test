const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const yaml = require('js-yaml');

const artifactsFolderPath = '../artifacts';

describe("saucectl", () => {
    it("has not yet been run", async () => {
        try {
            const result = await fsPromises.stat(artifactsFolderPath);
            expect(result.isDirectory()).to.be.true;
        } catch (error) {
            throw ("Errors", error);
        }
    });
})
