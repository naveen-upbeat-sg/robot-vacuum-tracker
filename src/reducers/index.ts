import { RobotStateType } from '../store';
import { placeRobot } from '../utils/robotMovements';

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
        action.payload.grid,
        action.payload.facing
      );
      return {
        ...state,
        facing: robotPosition ? robotPosition.facing : null,
        location: robotPosition ? robotPosition.location : null,
      };
    case RobotActionCommand.move:
      return { ...state };
    default:
      return state;
  }
}

export default appReducer;
