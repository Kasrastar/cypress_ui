describe('Verify user can submit the form. ', () => {
    before(() => {
      cy.fixture('tc02').as('testData');
    });
  
    it('Enter all the input elds including picture and hit Submit', function () {  
      cy.visit('/')
        .clickCategoryByText("Forms")
        .url().should('include', "/forms");
  
      cy.clickSubCatByText("Practice Form")
        .url().should('include', '/automation-practice-form');
      
      const textInputs = {
        "firstName": this.testData.firstName,
        "lastName": this.testData.lastName,
        "userEmail": this.testData.userEmail,
        "userNumber": this.testData.userNumber,
        "subjectsInput": this.testData.subjectsInput,
      }

      Object.keys(textInputs).forEach((key) => {
        cy.get(`input[id="${key}"]`)
          .type(this.testData[key])
          .should('have.value', this.testData[key]);
       });

      

      cy.get(`input[type="radio"][value="${this.testData.gender}"]`)
        .check({force: true}).should("be.checked")


      const dateOfBirth = this.testData.dateOfBirth.split(" ");
      expect(dateOfBirth).to.have.lengthOf(3);
      const day = dateOfBirth[0].replace(/\D/g, '');

      cy.get('input[id="dateOfBirthInput"]').click();
      cy.get('.react-datepicker__month-select').select(dateOfBirth[1]);
      cy.get('.react-datepicker__year-select').select(dateOfBirth[2]);
      cy.get(`.react-datepicker__day--0${day}`).click();



      const hobbies = this.testData.hobbies.split(",");
      const hobbiesMap = {
        "Sports": "hobbies-checkbox-1",
        "Reading": "hobbies-checkbox-2",
        "Music": "hobbies-checkbox-3",
      }
      cy.log(hobbies);
      hobbies.forEach((hobby) => {
        cy.get(`input[id="${hobbiesMap[hobby]}"]`)
          .check({force: true}).should("be.checked")
      });
      
      cy.get("input[type='file']").selectFile("cypress/fixtures/"+this.testData.picture);

      const [state, city] = this.testData.stateAndCity.split(',').map(item => item.trim());

      cy.selectState('#react-select-3-input', state);
      cy.get('.css-1uccc91-singleValue').should('contain', state);

      
      cy.selectState('#react-select-4-input', city);
      cy.get('.css-1uccc91-singleValue').should('contain', city);

    });
  });
  