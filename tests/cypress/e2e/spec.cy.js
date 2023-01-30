describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
    cy.get("input[type=submit]").click();
    cy.get("#analysis");
  });
});