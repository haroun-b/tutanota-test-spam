const validJsonName = "e2e-valid-emails.json";


describe("when user uploads a valid emails json", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[name=emails]").selectFile(`./cypress/fixtures/${validJsonName}`);
  });

  it(`displays ${validJsonName} as file name in input`, () => {
    require("../helpers/check-input-name")(validJsonName);
  });

  it("renders example analysis result on the page", () => {
    cy.get("input[type=submit]").click();
    cy.fixture(validJsonName).then(validJsonFile => {
      cy.get("#analysis").children().should("have.length", validJsonFile.length);
    });
  });
});