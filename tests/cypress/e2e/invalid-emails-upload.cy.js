const invalidJsonName = "invalid-emails.json";


describe("when user uploads an invalid emails json", () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'error').as('consoleError');
      },
    });
    cy.get("input[name=emails]").selectFile(`./cypress/fixtures/${invalidJsonName}`);
  });

  it(`displays ${invalidJsonName} as file name in input`, () => {
    cy.get("input[name=emails]").should($input => {
      const inputFileName = $input[0].files[0].name;

      expect(inputFileName).to.equal(invalidJsonName);
    });
  });

  describe("alerts and logs", () => {
    beforeEach(() => {
      cy.get("input[type=submit]").click();
    });

    it("alerts user to follow the recommended structure", () => {
      cy.on("window:alert", (msg) => {
        expect(msg).to.equal("Please provide a json that follows the recommended structure");
      });
    });

    it("logs an error to the console", () => {
      cy.get("@consoleError").should("be.calledWith", "Invalid input!");
    });
  });
});