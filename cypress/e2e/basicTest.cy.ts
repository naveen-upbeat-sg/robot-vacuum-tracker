describe('Robot Vacuum ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3020/');
  });
  it('has a header navigation', () => {
    cy.get('#root > header').should('be.visible');
  });

  it('has a footer', () => {
    cy.get('#root [data-test-id=site-footer]').should('be.visible');
  });

  describe('has a robo grid container', () => {
    it('visible', () => {
      cy.get('#root [data-test-id=robo-grid-container]').should('be.visible');
    });
    it('has a grid with 5x5 boxes', () => {
      cy.get('#root [data-test-id=x_0]').should('be.visible');
      cy.get('#root [data-test-id=x_0] > div').its('length').should('be.at.least', 5);
      cy.get('#root [data-test-id=x_1]').should('be.visible');
      cy.get('#root [data-test-id=x_2]').should('be.visible');
      cy.get('#root [data-test-id=x_3]').should('be.visible');
      cy.get('#root [data-test-id=x_4]').should('be.visible');
    });
    it('has robo command report and history container', () => {
      cy.get('#root [data-test-id=command-report-and-history-container]').should('be.visible');
    });

    describe('and robo command report and history container', () => {
      it('has a command report box', () => {
        cy.get('#root [data-test-id=command-report-box]').should('be.visible');
      });
      it('has a command history box', () => {
        cy.get('#root [data-test-id=command-history-box]').should('be.visible');
      });
    });
  });

  describe('has a robo commands container', () => {
    it('visible', () => {
      cy.get('#root [data-test-id=robot-commands-container]').should('be.visible');
    });

    describe('has multiple commands container',()=>{
      it('visible', () => {
        cy.get('#root [data-test-id=multiple-commands-container]').should('be.visible');
      });
      it('has multiple commands box', ()=>{
        cy.get("#root [data-test-id=multi-commands-box]").should('be.visible');
      })
      it('has a button to Enter the multiple commands', ()=>{
        cy.get("#root [data-test-id=multi-commands-button]").should('be.visible');
      })
    })

    describe('has simple commands container', ()=>{
      it('visible', () => {
        cy.get('#root [data-test-id=simple-command-container]').should('be.visible');
      });

      it('has a Position X input', ()=>{
        cy.get('#root [data-test-id=position-x-box]').should('be.visible');
      });

      it('has a Position Y input', ()=>{
        cy.get("#root [data-test-id=position-y-box]").should('be.visible');
      })

      it('has a Facing select box', ()=>{
        cy.get("#root [data-test-id=facing-select-box]").should('be.visible');
      })

      it('has a button to give command -> Place', ()=>{
        cy.get('#root [data-test-id=button-place]').should('be.visible');
      })

      it('has a button to give command -> Move', ()=>{
        cy.get("#root [data-test-id=button-move]").should('be.visible');
      })

      it('has a button to give command -> Rotate Left', ()=>{
        cy.get("#root [data-test-id=turn-left-button]").should('be.visible');
      });

      it('has a button to give command -> Rotate Right', ()=>{
        cy.get("#root [data-test-id=turn-right-button]").should('be.visible');
      });

      it('has a button to give command -> Report', ()=>{
        cy.get("#root [data-test-id=report-button]").should('be.visible');
      });

    });
  });
});
