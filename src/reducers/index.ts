import { RobotStateType } from '../store';
import {
  getCommandString,
  newFacingOnRotation,
  nextLocationOnMove,
  placeRobot,
  reportRobotStat,
  RobotRotate,
} from '../utils/robotMovements';

export type RobotAction = {
  type: string;
  payload?: any;
};

export enum RobotActionCommand {
  place = 'PLACE',
  move = 'MOVE',
  rotateLeft = 'ROTATE_LEFT',
  rotateRight = 'ROTATE_RIGHT',
  report = 'REPORT',
  multiCommandReport = 'MULTI_COMMAND_REPORT',
}

function appReducer(state: RobotStateType, action: RobotAction): RobotStateType {
  switch (action.type) {
    case RobotActionCommand.place: {
      const robotPosition = placeRobot(
        action.payload.location,
        action.payload.gridSize,
        action.payload.facing
      );
      const commandString = getCommandString(
        action.type,
        action.payload.location,
        action.payload.facing
      );
      state.commandHistory.push(commandString);
      const updatedCommandHistory = [...state.commandHistory];

      return {
        ...state,
        facing: robotPosition ? robotPosition.facing : null,
        location: robotPosition ? robotPosition.location : null,
        commandHistory: updatedCommandHistory,
      };
    }
    case RobotActionCommand.move: {
      const newLocationOnMove = nextLocationOnMove(
        action.payload.location,
        action.payload.gridSize,
        action.payload.facing
      );
      const commandString = getCommandString(action.type);
      state.commandHistory.push(commandString);
      const updatedCommandHistory = [...state.commandHistory];
      return { ...state, location: newLocationOnMove, commandHistory: updatedCommandHistory };
    }
    case RobotActionCommand.rotateLeft: {
      const newLocationOnRotate = newFacingOnRotation(RobotRotate.left, action.payload.facing);
      const commandString = getCommandString(action.type);
      state.commandHistory.push(commandString);
      const updatedCommandHistory = [...state.commandHistory];
      return { ...state, facing: newLocationOnRotate, commandHistory: updatedCommandHistory };
    }
    case RobotActionCommand.rotateRight: {
      const newLocationOnRotateRight = newFacingOnRotation(
        RobotRotate.right,
        action.payload.facing
      );
      const commandString = getCommandString(action.type);
      state.commandHistory.push(commandString);
      const updatedCommandHistory = [...state.commandHistory];
      return { ...state, facing: newLocationOnRotateRight, commandHistory: updatedCommandHistory };
    }
    case RobotActionCommand.report: {
      const reportMesageUpdate = reportRobotStat(action.payload.location, action.payload.facing);
      state.commandHistory.push(action.type);
      const updatedCommandHistory = [...state.commandHistory];
      return { ...state, reportMessage: reportMesageUpdate, commandHistory: updatedCommandHistory };
    }
    case RobotActionCommand.multiCommandReport: {
      const reportMesageUpdate = action.payload.result;
      const resultSplitArray = reportMesageUpdate?.split(',');
      const xLocation = resultSplitArray?.[0];
      const yLocation = resultSplitArray?.[1];
      const facing = resultSplitArray?.[2];

      const updatedLocation = { ...state.location, x: xLocation, y: yLocation };
      state.commandHistory.push(action.payload.commands);
      const updatedCommandHistory = [...state.commandHistory];
      return {
        ...state,
        reportMessage: reportMesageUpdate,
        location: updatedLocation,
        facing,
        commandHistory: updatedCommandHistory,
      };
    }
    default:
      return state;
  }
}

export default appReducer;
