// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const { expect } = require("chai");


Cypress.Commands.add('clickCategoryByText', (text) => {
  cy.get('.card').contains('h5', text).click();
})

Cypress.Commands.add('clickSubCatByText', (text) => {
  cy.contains('span.text', text).click();
})

Cypress.Commands.add("checkCellText", (element, text) => {
  const elementText = element.text().trim();
  if (elementText === text) {
    cy.wrap(element).should('contain.text', text);
  }
});

Cypress.Commands.add('selectState', (addr, state) => {
  cy.get(addr).click({ force: true });
  cy.get(addr).type(state, { force: true });
  cy.get(addr).type('{enter}', { force: true });
});