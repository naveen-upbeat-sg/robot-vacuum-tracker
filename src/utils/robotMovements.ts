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
      newLocation.y = newLocation.y + 1;
      break;
    }
    case RobotFacing.east: {
      newLocation.x = newLocation.x + 1;
      break;
    }
    case RobotFacing.south: {
      newLocation.y = newLocation.y - 1;
      break;
    }
    case RobotFacing.west: {
      newLocation.x = newLocation.x - 1;
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

const reportRobotStat: (
  location: LocationAlias,
  facing: RobotFacing
) => { location: LocationAlias; facing: RobotFacing } = (location, facing) => {
  return {
    location: { ...location },
    facing,
  };
};

export { placeRobot, isLocationValid, nextLocationOnMove, newFacingOnRotation, reportRobotStat };
