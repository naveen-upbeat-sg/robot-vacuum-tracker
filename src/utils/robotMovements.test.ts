import {
  isLocationValid,
  LocationAlias,
  placeRobot,
  RobotFacing,
  RobotMovmentGrid,
} from './robotMovements';
//import jest from 'jest'
import { describe, expect } from '@jest/globals';

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
      const result = placeRobot(
        testLocation,
        defaultGrid,
        testFacing
      );
      expect(result.location.x).toBe(0);
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
});
