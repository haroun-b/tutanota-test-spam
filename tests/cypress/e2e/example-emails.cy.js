const exampleJsonName = "emails-example.json";
const exampleJsonFile = require(`../../../public/scripts/${exampleJsonName}`);


describe("when user submits without upload", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[type=submit]").click();
  });

  it(`displays ${exampleJsonName} as file name in input`, () => {
    cy.get("input[name=emails]").should($input => {
      const inputFileName = $input[0].files[0].name;

      expect(inputFileName).to.equal(exampleJsonName);
    });
  });

  it("renders example analysis result on the page", () => {
    cy.get("#analysis").children().should("have.length", exampleJsonFile.length);
  });
});