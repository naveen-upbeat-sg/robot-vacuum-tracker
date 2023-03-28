import { describe, expect } from '@jest/globals';

import { multiLineCommandsEvaluate, RobotMovmentGrid } from './robotMovements';
const commands = process.argv.filter((x) => x.startsWith('try='))[0];
const delimitedCommands = commands ? commands.split('=')[1] : 'PLACE 0,0,NORTH';
let upperCaseCommands = delimitedCommands.toUpperCase();

const expectedOutputArgument = process.argv.filter((x) => x.startsWith('expected='))[0];
const expectedOutput = expectedOutputArgument ? expectedOutputArgument.split('=')[1] : '0,0,NORTH';

const defaultGrid: RobotMovmentGrid = {
  x: 4,
  y: 4,
};

describe('Test Robot Vacuum with custom inputs from command line', () => {
  it('Output the Robot Report based on the commands - ', () => {
    if (!upperCaseCommands.endsWith('REPORT')) {
      upperCaseCommands = upperCaseCommands.concat('|REPORT');
    }
    const result = multiLineCommandsEvaluate(upperCaseCommands.split('|').join('\n'), defaultGrid);
    if (expectedOutputArgument) {
      expect(result?.report).toBe(expectedOutput);
    } else {
      console.log('*********Output: ', result?.report, '**********');
      expect(true).toBe(true);
    }
  });
});
