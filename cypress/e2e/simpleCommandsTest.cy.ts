describe('Robot Vacuum - Simple Commands', () => {
  // beforeEach(()=>{
  //     cy.visit('http://localhost:3020/');
  // });
  describe('Can place a robot - ', () => {
    it('at location 0,0 facing NORTH', () => {
      cy.visit('http://localhost:3020/');

      cy.get('#root [data-test-id=position-x-box] input').type('0');

      cy.get('#root [data-test-id=position-y-box] input').type('0');

      cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

      cy.get('li[data-value=NORTH]').click();

      cy.get('#root button[data-test-id=button-place]').click();

      cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
        'be.visible'
      );
    });
  });

  describe('Cannot place a robot - ', () => {
    it('at invalid location say 5,5,North', () => {
      cy.visit('http://localhost:3020/');

      cy.get('#root [data-test-id=position-x-box] input').type('5');

      cy.get('#root [data-test-id=position-y-box] input').type('5');

      cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

      cy.get('li[data-value=NORTH]').click();

      cy.get('#root button[data-test-id=button-place]').click();

      cy.get('#root [data-test-id=robotic-image-container]').should('not.exist');
    });
  });

  describe('Can move a robot - ', () => {
    describe('one unit to next available block in that direction - ', () => {
      it('placed at 0,0,North moves to 0,1,North', () => {
        cy.visit('http://localhost:3020/');

        cy.get('#root [data-test-id=position-x-box] input').type('0');

        cy.get('#root [data-test-id=position-y-box] input').type('0');

        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

        cy.get('li[data-value=NORTH]').click();

        cy.get('#root button[data-test-id=button-place]').click();

        cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=button-move]').click();

        cy.get('#root [data-test-id=x_0_y_1] [data-test-id=robotic-image-container]').should(
            'be.visible'
          );

      });
    });
  });
});
