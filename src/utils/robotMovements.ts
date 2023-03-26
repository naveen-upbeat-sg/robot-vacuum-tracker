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

const placeRobot: (location: LocationAlias, grid: RobotMovmentGrid, facing: RobotFacing) => number =
  function (location, grid, facing) {
    return 0;
  };

const isLocationValid: (location: LocationAlias, grid: RobotMovmentGrid) => boolean = (
  location,
  grid
) => {
  const isLocationXValid = location.x >= 0 && location.x <= grid.x;
  const isLocationYValid = location.y >= 0 && location.y <= grid.y;
  return isLocationXValid && isLocationYValid;
};

export { placeRobot, isLocationValid };
