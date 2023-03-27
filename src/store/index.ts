import { GridSize } from "../components/RobotGrid";
import { LocationAlias, RobotFacing } from "../utils/robotMovements";

export type RobotStateType = {
    location: LocationAlias | null,
    facing: RobotFacing | null,
    gridSize: GridSize
}

const initialState: RobotStateType = {
    location: null,
    facing: null,
    gridSize: {
        x: 4,
        y: 4
    }
}

export default initialState;