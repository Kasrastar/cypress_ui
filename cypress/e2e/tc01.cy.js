describe('Verify user can enter new data into the table', () => {
  before(() => {
    cy.fixture('tc01').as('testData');
  });

  it('Enter test data into input fields and hit submit', function () {  
    cy.visit('/')
      .clickCategoryByText("Elements")
      .url().should('include', "/elements");

    cy.clickSubCatByText("Web Tables")
      .url().should('include', '/webtables');

    cy.get("#addNewRecordButton").click();

    Object.keys(this.testData).forEach((key) => {
      cy.get(`input[id="${key}"]`)
          .type(this.testData[key])
          .should('have.value', this.testData[key]);
     });
    cy.get('#submit').click();

    let list = [];
    cy.get('.rt-tr-group').each(($group) => {
        cy.wrap($group)
            .find('.rt-tr')
            .each(($row) => {
                cy.wrap($row).find('.rt-td').each(($cell, index) => {
                    list.push($cell.text());
                });
            });
    }).then(() => {
        cy.log(JSON.stringify(list));
        expect(list).to.contains(this.testData.firstName);
        expect(list).to.contains(this.testData.lastName);
        expect(list).to.contains(this.testData.age);
        expect(list).to.contains(this.testData.userEmail);
        expect(list).to.contains(this.testData.salary);
        expect(list).to.contains(this.testData.department);
    });
  });
});
