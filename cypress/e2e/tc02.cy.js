describe('Verify user can submit the form.', () => {
  before(() => {
      // Load test data from fixture file
      cy.fixture('tc02').as('testData');
  });

  it('Enter all the input fields including picture and hit Submit', function () {
      // Visit the main page and navigate to the Forms category
      cy.visit('/')
          .clickCategoryByText("Forms")
          .url().should('include', "/forms");

      // Navigate to the Practice Form subcategory
      cy.clickSubCatByText("Practice Form")
          .url().should('include', '/automation-practice-form');

      // Fill in text input fields
      const textInputs = {
          "firstName": this.testData.firstName,
          "lastName": this.testData.lastName,
          "userEmail": this.testData.userEmail,
          "userNumber": this.testData.userNumber,
          "subjectsInput": this.testData.subjectsInput,
      };

      Object.keys(textInputs).forEach((key) => {
          cy.get(`input[id="${key}"]`)
              .type(this.testData[key])
              .should('have.value', this.testData[key]);
      });

      // Select gender radio button
      cy.get(`input[type="radio"][value="${this.testData.gender}"]`)
          .check({ force: true }).should("be.checked");

      // Select date of birth
      const dateOfBirth = this.testData.dateOfBirth.split(" ");
      expect(dateOfBirth).to.have.lengthOf(3);
      const day = dateOfBirth[0].replace(/\D/g, '');

      cy.get('input[id="dateOfBirthInput"]').click();
      cy.get('.react-datepicker__month-select').select(dateOfBirth[1]);
      cy.get('.react-datepicker__year-select').select(dateOfBirth[2]);
      cy.get(`.react-datepicker__day--0${day}`).click();

      // Select hobbies checkboxes
      const hobbies = this.testData.hobbies.split(",");
      const hobbiesMap = {
          "Sports": "hobbies-checkbox-1",
          "Reading": "hobbies-checkbox-2",
          "Music": "hobbies-checkbox-3",
      };
      cy.log(hobbies);
      hobbies.forEach((hobby) => {
          cy.get(`input[id="${hobbiesMap[hobby]}"]`)
              .check({ force: true }).should("be.checked");
      });

      // Upload a picture
      cy.get("input[type='file']").selectFile("cypress/fixtures/" + this.testData.picture);
      
      // Fill in current address
      cy.get('textarea')
          .type(this.testData.currentAddress)
          .should('have.value', this.testData.currentAddress);


      // Parse state and city from the test data
      const [state, city] = this.testData.stateAndCity.split(',').map(item => item.trim());

      cy.selectState('#react-select-3-input', state);
      cy.get('.css-1uccc91-singleValue').should('contain', state);

      
      cy.selectState('#react-select-4-input', city);
      cy.get('.css-1uccc91-singleValue').should('contain', city);



  });
});