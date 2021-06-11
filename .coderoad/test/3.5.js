const expect = require("chai").expect;
const fsPromises = require("fs").promises;
const sinon = require("sinon");

const SwagPagePath = "../cypress/pageobjects/SwagOverviewPage.js";
const SwagPage = require("../../cypress/pageobjects/SwagOverviewPage.js").default;

describe("SwagOverviewPage.js", function () {
    it("does not exist", async () => {
        try {
            const file = await fsPromises.readFile(SwagPagePath, "utf-8");
            expect(file).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });

    it("should have a screen method that calls .inventory_list", () => {
        try {
            SwagPage.screen;
            const inventoryList = spy.calledWith(
                ".inventory_list"
            );
            expect(inventoryList).to.be.ok;
        } catch (error) {
            throw ("Errors", error);
        }
    });
});