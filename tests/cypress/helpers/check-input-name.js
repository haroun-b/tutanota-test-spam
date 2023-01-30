module.exports = function (jsonFileName) {
  cy.get("input[name=emails]").should($input => {
    const inputFileName = $input[0].files[0].name;

    expect(inputFileName).to.equal(jsonFileName);
  });
};