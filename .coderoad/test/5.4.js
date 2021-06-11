const expect = require("chai").expect;
const fsPromises = require("fs").promises;

const sauceIgnorePath = '../.sauceignore';

describe(".sauceignore", () => {
    it("file does not exist", async () => {
        try {
            const file = await fsPromises.readFile(sauceIgnorePath, 'utf-8');
            expect(file).to.be.ok;
        } catch (error) {
            throw ('Errors', error);
        }
    });
    it("should contain cypress, assets and artifact files/folders", async () => {
        try {
            const file = await fsPromises.readFile(sauceIgnorePath, 'utf-8');
            const lines = file.split('\n')
            const targets = [
                /cypress\/videos/,
                /cypress\/results/,
                /cypress\/screenshots/,
                /node_modules/,
                /.git/,
                /.DS_Store/,
                /__assets__/,
                /\*\*\/__assets__/
            ]
            for (const target of targets) {
                if (lines.some((line) => line.match(new RegExp(target)))) {
                    expect(true).to.be.ok
                } else {
                    throw new Error(`Missing ${target}`)
                }

            }
        } catch (error) {
            throw ('Errors', error);
        }
    });
});