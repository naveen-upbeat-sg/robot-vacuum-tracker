describe('Robot Vacuum - Simple Commands', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3020/');
  });
  describe('Can place a robot - ', () => {
    it('at location 0,0 facing NORTH', () => {
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
      it('placed at 0,0,NORTH moves to 0,1,North', () => {
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
    describe('after rotating in another direction', () => {
      it('placed at 4,4,NORTH cant move then rotate LEFT and move to 3,4,WEST', () => {
        cy.get('#root [data-test-id=position-x-box] input').type('4');

        cy.get('#root [data-test-id=position-y-box] input').type('4');

        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

        cy.get('li[data-value=NORTH]').click();

        cy.get('#root button[data-test-id=button-place]').click();

        cy.get('#root [data-test-id=x_4_y_4] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=button-move]').click();

        cy.get('#root [data-test-id=x_4_y_4] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=turn-left-button]').click();

        cy.get('#root button[data-test-id=button-move]').click();

        cy.get('#root [data-test-id=x_3_y_4] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('3,4,WEST');
      });
    });
  });

  describe('Can not move a robot - ', () => {
    describe('one unit outside the grid in that direction', () => {
      it('placed a 0,4,North cannot move further', () => {
        cy.get('#root [data-test-id=position-x-box] input').type('0');

        cy.get('#root [data-test-id=position-y-box] input').type('4');

        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

        cy.get('li[data-value=NORTH]').click();

        cy.get('#root button[data-test-id=button-place]').click();

        cy.get('#root [data-test-id=x_0_y_4] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=button-move]').click();

        cy.get('#root [data-test-id=x_0_y_4] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );
      });

      it('placed a 4,0,EAST cannot move further', () => {
        cy.get('#root [data-test-id=position-x-box] input').type('4');

        cy.get('#root [data-test-id=position-y-box] input').type('0');

        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();

        cy.get('li[data-value=EAST]').click();

        cy.get('#root button[data-test-id=button-place]').click();

        cy.get('#root [data-test-id=x_4_y_0] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=button-move]').click();

        cy.get('#root [data-test-id=x_4_y_0] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );
      });
    });
  });

  describe('Can Rotate - ', () => {
    beforeEach(()=>{
        cy.get('#root [data-test-id=position-x-box] input').type('0');

        cy.get('#root [data-test-id=position-y-box] input').type('0');
  
        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();
  
        cy.get('li[data-value=NORTH]').click();
  
        cy.get('#root button[data-test-id=button-place]').click();
  
        cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );
    });
    it('Stays in same box, does not change location', () => {

      cy.get('#root button[data-test-id=turn-left-button]').click();

      cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
        'be.visible'
      );

      cy.get('#root button[data-test-id=turn-right-button]').click();

      cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
        'be.visible'
      );
    });

    it('Facing North, turn right, now faces EAST', () => {

        cy.get('#root button[data-test-id=turn-right-button]').click();

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('0,0,EAST');

    });

    it('Facing North, turn left, now faces WEST', () => {
        cy.get('#root button[data-test-id=turn-left-button]').click();

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('0,0,WEST');

    });

    it('Facing North, turn left twice now faces SOUTH', () => {
        cy.get('#root button[data-test-id=turn-left-button]').click();

        cy.get('#root button[data-test-id=turn-left-button]').click();

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('0,0,SOUTH');

    });

    it('Facing North, turn right twice now faces SOUTH', () => {
        cy.get('#root button[data-test-id=turn-right-button]').click();

        cy.get('#root button[data-test-id=turn-right-button]').click();

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('0,0,SOUTH');

    });
  });

  describe('Can show report when robot is placed -', ()=>{
    it('Placed robot on available block and report prints placed location', ()=>{
        cy.get('#root [data-test-id=position-x-box] input').type('0');

        cy.get('#root [data-test-id=position-y-box] input').type('0');
  
        cy.get('#root [data-test-id=facing-select-box] [role=button]').click();
  
        cy.get('li[data-value=NORTH]').click();
  
        cy.get('#root button[data-test-id=button-place]').click();
  
        cy.get('#root [data-test-id=x_0_y_0] [data-test-id=robotic-image-container]').should(
          'be.visible'
        );

        cy.get('#root button[data-test-id=report-button]').click();

        cy.get('#root [data-test-id=command-report-box]').contains('0,0,NORTH');
    })
  })

});
