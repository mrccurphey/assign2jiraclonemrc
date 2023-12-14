    const issueTitle = 'This is an issue of type: Task.';
    const deleteTitle = 'Are you sure you want to delete this issue?' 
    const deleteTitle2 = 'Once you delete, gone for good'
    const urltest = `${Cypress.env('baseUrl')}project/board`
   
describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue 
    cy.visit(url + '/board');
    cy.contains(issueTitle).click();
    
    });

  })
  
  it('Test Case 1 delete issue successfully', () => {
    //assert issue is open
   cy.get('[data-testid = "modal:issue-details"]').should('be.visible')
    //delete 
    cy.get('[data-testid="icon:trash"]').click()
    cy.get('[data-testid="modal:confirm"]').within(() => {
    cy.contains(deleteTitle).should('be.visible'); 
    cy.contains("Once you delete, it's gone for good").should('be.visible');
    cy.contains('Delete issue').click()
  })
    //assert delete confirmation dialogue is not visible
    cy.get('[data-testid = "modal:confirm"]').should('not.exist')
    cy.reload();
    cy.contains(deleteTitle).should('not.exist');//why is line 29 better than line 31 as a code
    // issue should no longer exist
    cy.visit(urltest);
    cy.contains(issueTitle).should('not.exist');
  });



  it('Test Case 2 cancel delete issue successfully', () => {
    //assert issue is open
    cy.get('[data-testid = "modal:issue-details"]').should('be.visible')
    //delete 
    cy.get('[data-testid="icon:trash"]').click()
    cy.contains(deleteTitle).should('exist');
    cy.contains('Cancel').click()
    //assert delete confirmation dialogue is not visible
    cy.get('[data-testid = "modal:confirm"]').should('not.exist')
    cy.reload();
    cy.contains(deleteTitle).should('not.exist');
    // issue should exist
    cy.visit(urltest);
    cy.contains(issueTitle).should('exist');
  });

})