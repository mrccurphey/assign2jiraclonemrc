/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
       IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
    //delete 
    IssueModal.clickDeleteButton()
    //assert delete confirmation dialogue is not visible
    // issue should no longer exist
    IssueModal.confirmDeletion()
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)

  });

  it('Should cancel deletion process successfully', () => {
    //add steps to start deletion proces but cancel it
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
    IssueModal.clickDeleteButton()
    IssueModal.cancelDeletion()
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
  });
});