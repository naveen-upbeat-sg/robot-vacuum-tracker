import {LocationAlias, placeRobot, RobotFacing} from './robotMovements'

describe('RobotVacuum Movements - ', () => { 
    describe('place method - ', ()=>{
        it('when invoked with location and facing returns nothing', ()=>{
                const testLocation:LocationAlias = {x: 3, y:2};
                const testFacing : RobotFacing = RobotFacing.east;
                const result:number = placeRobot(testLocation, testFacing);
                expect(result).toBe(0);
        });
    })

});