import { RobotStateType } from '../store';
import {
  newFacingOnRotation,
  nextLocationOnMove,
  placeRobot,
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
}

function appReducer(state: RobotStateType, action: RobotAction): RobotStateType {
  switch (action.type) {
    case RobotActionCommand.place:
      const robotPosition = placeRobot(
        action.payload.location,
        action.payload.gridSize,
        action.payload.facing
      );
      return {
        ...state,
        facing: robotPosition ? robotPosition.facing : null,
        location: robotPosition ? robotPosition.location : null,
      };
    case RobotActionCommand.move:
      const newLocationOnMove = nextLocationOnMove(
        action.payload.location,
        action.payload.gridSize,
        action.payload.facing
      );
      return { ...state, location: newLocationOnMove };
    case RobotActionCommand.rotateLeft:
      const newLocationOnRotate = newFacingOnRotation(RobotRotate.left, action.payload.facing);
      return { ...state, facing: newLocationOnRotate };
    case RobotActionCommand.rotateRight:
      const newLocationOnRotateRight = newFacingOnRotation(RobotRotate.right, action.payload.facing);
      return { ...state, facing: newLocationOnRotateRight };
    default:
      return state;
  }
}

export default appReducer;
