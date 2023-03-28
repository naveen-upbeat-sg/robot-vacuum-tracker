import { RobotActionCommand } from '../reducers';

export type LocationAlias = {
  x: number;
  y: number;
};

export enum RobotFacing {
  north = 'NORTH',
  east = 'EAST',
  south = 'SOUTH',
  west = 'WEST',
}

export type RobotMovmentGrid = {
  x: number;
  y: number;
};

export enum RobotRotate {
  left = 'LEFT',
  right = 'RIGHT',
}

const isLocationValid: (location: LocationAlias, grid: RobotMovmentGrid) => boolean = (
  location,
  grid
) => {
  const isLocationXValid = location.x >= 0 && location.x <= grid.x;
  const isLocationYValid = location.y >= 0 && location.y <= grid.y;
  return isLocationXValid && isLocationYValid;
};

const placeRobot: (
  location: LocationAlias,
  grid: RobotMovmentGrid,
  facing: RobotFacing
) => { location: LocationAlias; facing: RobotFacing } | null = function (location, grid, facing) {
  return isLocationValid(location, grid) ? { location, facing } : null;
};

const nextLocationOnMove: (
  location: LocationAlias,
  grid: RobotMovmentGrid,
  facing: RobotFacing
) => LocationAlias = (location, grid, facing) => {
  let newLocation = {
    ...location,
  };
  switch (facing) {
    case RobotFacing.north: {
      newLocation.y = +newLocation.y + 1;
      break;
    }
    case RobotFacing.east: {
      newLocation.x = +newLocation.x + 1;
      break;
    }
    case RobotFacing.south: {
      newLocation.y = +newLocation.y - 1;
      break;
    }
    case RobotFacing.west: {
      newLocation.x = +newLocation.x - 1;
      break;
    }
  }
  return isLocationValid(newLocation, grid) ? newLocation : location;
};

const newFacingOnRotation: (rotation: RobotRotate, facing: RobotFacing) => RobotFacing = (
  rotation,
  facing
) => {
  switch (facing) {
    case RobotFacing.east: {
      if (rotation == RobotRotate.left) {
        return RobotFacing.north;
      }
      return RobotFacing.south;
    }
    case RobotFacing.south: {
      if (rotation == RobotRotate.left) {
        return RobotFacing.east;
      }
      return RobotFacing.west;
    }
    case RobotFacing.west: {
      if (rotation == RobotRotate.left) {
        return RobotFacing.south;
      }
      return RobotFacing.north;
    }
    case RobotFacing.north: {
      if (rotation == RobotRotate.left) {
        return RobotFacing.west;
      }
      return RobotFacing.east;
    }
  }
};

const reportRobotStat: (location: LocationAlias, facing: RobotFacing) => string = (
  location,
  facing
) => {
  if(!location || !facing){
    return "";
  }
  return `${location.x},${location.y},${facing}`;
};

const getCommandString: (
  actionType: RobotActionCommand,
  location?: LocationAlias,
  facing?: RobotFacing
) => string = (actionType, location, facing) => {
  let commandString = '';
  switch (actionType) {
    case RobotActionCommand.place: {
      commandString = `${actionType} ${location?.x},${location.y},${facing || ''}`;
      break;
    }
    case RobotActionCommand.move: {
      commandString = actionType;
      break;
    }
    case RobotActionCommand.rotateLeft: {
      commandString = 'LEFT';
      break;
    }
    case RobotActionCommand.rotateRight: {
      commandString = 'RIGHT';
      break;
    }
  }
  return commandString;
};

const multiLineCommandsEvaluate = (
  multiLineCommands: string,
  gridSize: RobotMovmentGrid
): any => {
  const multiLineCommandsFromState = multiLineCommands.split('\n');
  return (
    multiLineCommandsFromState.reduce(
      (accumulated: any, currentCommand: string) => {
        const commandVerb = currentCommand.split(' ')[0];
        switch (commandVerb) {
          case RobotActionCommand.place: {
            const locationFacingFromPlaceCommand = currentCommand.split(' ')[1];
            const locationComps = locationFacingFromPlaceCommand.split(',');
            const loc: LocationAlias = {
              x: Number(locationComps[0]),
              y: Number(locationComps[1]),
            };
            const robotFacing: RobotFacing = locationComps[2] as RobotFacing;
            return {
              ...accumulated,
              ...placeRobot(loc, accumulated.gridSize, robotFacing),
            };
          }
          case RobotActionCommand.move: {
            return {
              ...accumulated,
              location: {
                ...nextLocationOnMove(
                  accumulated.location,
                  accumulated.gridSize,
                  accumulated.facing
                ),
              },
            };
          }
          case 'LEFT': {
            const newFacing = newFacingOnRotation(RobotRotate.left, accumulated.facing);
            return { ...accumulated, facing: newFacing };
          }
          case 'RIGHT': {
            const newFacing = newFacingOnRotation(RobotRotate.right, accumulated.facing);
            return { ...accumulated, facing: newFacing };
          }
          case RobotActionCommand.report: {
            return {
              ...accumulated,
              report: reportRobotStat(accumulated.location, accumulated.facing),
            };
          }
        }
      },
      {
        location: { x: 0, y: 0 },
        facing: RobotFacing.east,
        gridSize,
      }
    )
  );
};

export {
  placeRobot,
  isLocationValid,
  nextLocationOnMove,
  newFacingOnRotation,
  reportRobotStat,
  getCommandString,
  multiLineCommandsEvaluate,
};
