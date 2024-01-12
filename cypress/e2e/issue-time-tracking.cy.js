/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "c:/Users/mail/cypress_simple_tests/cypress/PROJECT 5/jira-clone-e2e/cypress/pages/IssueModal";

describe("Issue time tracking adding, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });
  const issueDetailModal = '[data-testid="modal:issue-details"]';
  const timeEstimate = 'input[placeholder="Number"]';
  const hoursEstimate = "10";
  const hoursEstimateAmend = "20";
  const issueText = "TEST_TITLE";
  const issueDetails = {
    issueType: "Bug",
    description: "TEST_DESCRIPTION",
    title: "TEST_TITLE",
    assignee: "Lord Gaben",
  };

  it("Should add estimation, edit it,delete the estimation successfully and log time spent and delete it", () => {
    //number of issues we expect to see in the backlog after the test
    const EXPECTED_AMOUNT_OF_ISSUES = "5";
    IssueModal.createIssue(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
    cy.contains(issueText).click();
    cy.get(timeEstimate).type(hoursEstimate);
    cy.get(issueDetailModal).contains("Description").click();
    //confirm estimate is saved
    cy.get(timeEstimate).should("have.value", hoursEstimate);
    //update estimation
    cy.get(timeEstimate).clear();
    cy.get(timeEstimate).type(hoursEstimateAmend);
    cy.get(issueDetailModal).contains("Description").click();
    //confirm estimate is saved
    cy.get(timeEstimate).should("have.value", hoursEstimateAmend);
    //remove estimation
    cy.get(timeEstimate).clear();
    cy.get(issueDetailModal).contains("Description").click();
    //confirm estimate is saved
    cy.get(timeEstimate).should("be.visible");
    cy.contains("20h estimated").should("not.exist");
    //time logging inputs
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get(timeEstimate).eq(0).type("2").click();
      cy.get(timeEstimate).eq(1).type("5").click();
      cy.contains("button", "Done").click().should("not.exist");
    });
    //confirm time inputs are saved
    cy.contains("div", "logged").should("be.visible");
    cy.contains("div", "remaining").should("be.visible");
    cy.contains("div", "No time logged").should("not.be.visible");
    //remove logged time
    cy.get('[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').within(() => {
      cy.get(timeEstimate).eq(0).clear();
      cy.get(timeEstimate).eq(1).clear();
      cy.contains("button", "Done").click().should("not.exist");
      //confirm removal
      cy.contains("div", "No time logged").should(".be.visible");
    });
  });
});
