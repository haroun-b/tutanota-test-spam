describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000');
    cy.get("input[type=submit]").click();
    cy.get("#analysis");
  });
});