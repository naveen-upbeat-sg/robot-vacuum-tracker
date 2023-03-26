export type LocationAlias = {
    x: number,
    y: number
}

export enum RobotFacing {
    north = 'NORTH',
    east = 'EAST',
    south = 'SOUTH',
    west = 'WEST'
}

const placeRobot : (location: LocationAlias , facing:RobotFacing ) => number = function (location , facing ){
    return 0;
}

export {
    placeRobot}
