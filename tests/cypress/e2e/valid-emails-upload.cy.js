const validJsonName = "valid-emails.json";


describe("when user uploads a valid emails json", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[name=emails]").selectFile(`./cypress/fixtures/${validJsonName}`);
    cy.get("input[type=submit]").click();
  });

  it(`displays ${validJsonName} as file name in input`, () => {
    cy.get("input[name=emails]").should($input => {
      const inputFileName = $input[0].files[0].name;

      expect(inputFileName).to.equal(validJsonName);
    });
  });

  it("renders example analysis result on the page", () => {
    cy.fixture(validJsonName).then(validJsonFile => {
      cy.get("#analysis").children().should("have.length", validJsonFile.length);
    });
  });
});