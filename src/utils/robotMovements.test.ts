import {
  getCommandString,
  isLocationValid,
  LocationAlias,
  multiLineCommandsEvaluate,
  newFacingOnRotation,
  nextLocationOnMove,
  placeRobot,
  reportRobotStat,
  RobotFacing,
  RobotMovmentGrid,
  RobotRotate,
} from './robotMovements';
//import jest from 'jest'
import { describe, expect } from '@jest/globals';
import { RobotActionCommand } from '../reducers';

describe('RobotVacuum Movements - ', () => {
  const defaultGrid: RobotMovmentGrid = {
    x: 4,
    y: 4,
  };

  describe('place method - ', () => {
    it(`is a valid method`, () => {
      expect(placeRobot).toBeDefined();
    });

    it('when invoked with location and facing returns nothing', () => {
      const testLocation: LocationAlias = { x: 3, y: 2 };
      const testFacing: RobotFacing = RobotFacing.east;
      const result = placeRobot(testLocation, defaultGrid, testFacing);
      expect(result.location.x).toBe(3);
    });
  });

  describe('isLocationValid - ', () => {
    it(`method is defined`, () => {
      expect(isLocationValid).toBeDefined();
    });

    it('returns false when location is negative', () => {
      const testLocation: LocationAlias = {
        x: -1,
        y: 0,
      };
      expect(isLocationValid(testLocation, defaultGrid)).toBeFalsy();
    });

    it('when invoked with valid location return true', () => {
      const testLocation: LocationAlias = {
        x: 0,
        y: 0,
      };
      const grid: RobotMovmentGrid = {
        x: 4,
        y: 4,
      };
      const isValid = isLocationValid(testLocation, grid);
      expect(isValid).toBeTruthy();
    });
  });

  describe('nextLocationOnMove -', () => {
    it('is defined', () => {
      expect(nextLocationOnMove).toBeDefined();
    });

    it('returns new location on move', () => {
      const testLocation: LocationAlias = { x: 3, y: 2 };
      const testFacing: RobotFacing = RobotFacing.east;

      expect(nextLocationOnMove(testLocation, defaultGrid, testFacing)).not.toBe(testLocation);
    });

    it('returns same location when reaches the wall', () => {
      const testLocation: LocationAlias = { x: 4, y: 2 };
      const testFacing: RobotFacing = RobotFacing.east;

      expect(nextLocationOnMove(testLocation, defaultGrid, testFacing)).toBe(testLocation);
    });
  });

  describe('newFacingOnRotation -', () => {
    it('is defined', () => {
      expect(newFacingOnRotation).toBeDefined();
    });

    it('returns different face on rotation', () => {
      const testFacing: RobotFacing = RobotFacing.east;
      expect(newFacingOnRotation(RobotRotate.left, testFacing)).not.toBe(testFacing);
    });

    it('returns appropriate new face on rotation - ', () => {
      const testFacing: RobotFacing = RobotFacing.east;
      expect(newFacingOnRotation(RobotRotate.left, testFacing)).toBe(RobotFacing.north);
    });
  });

  describe('reportRobotStat -', () => {
    it('is a valid method', () => {
      expect(reportRobotStat).toBeDefined();
    });
    it('returns report for given location and facing', () => {
      const testLocation: LocationAlias = { x: 0, y: 0 };
      const testFacing: RobotFacing = RobotFacing.east;
      expect(reportRobotStat(testLocation, testFacing)).toContain('EAST');
    });
    it('displays three values separated by commas', () => {
      const testLocation: LocationAlias = { x: 0, y: 0 };
      const testFacing: RobotFacing = RobotFacing.east;
      expect(reportRobotStat(testLocation, testFacing).split(',').length).toBe(3);
    });
  });

  describe('getCommandString -', () => {
    it('is a valid method', () => {
      expect(getCommandString).toBeDefined();
    });
    it('generates a string representing given action', () => {
      const testLocation: LocationAlias = { x: 0, y: 0 };
      const testFacing: RobotFacing = RobotFacing.east;
      const testActionType: RobotActionCommand = RobotActionCommand.place;

      expect(getCommandString(testActionType, testLocation, testFacing)).toContain(testFacing);
    });
  });

  describe('multiLineCommandsEvaluate -', () => {
    it('is valid method', () => {
      expect(multiLineCommandsEvaluate).toBeDefined();
    });
    it('generates a report for given set of commands', () => {
      const testMultiLineCommand = 'PLACE 0,0,NORTH \nMOVE \nREPORT';
      expect(multiLineCommandsEvaluate(testMultiLineCommand, defaultGrid)).toContain('1');
    });
  });
});
