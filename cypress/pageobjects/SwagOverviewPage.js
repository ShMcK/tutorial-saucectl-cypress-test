class SwagOverviewPage {
    // add methods
    get screen() {
        return cy.get('.inventory_list');
    }
}
export default new SwagOverviewPage();