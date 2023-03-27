import { Grid } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { Fragment, ReactFragment } from "react";

export type GridSize = {
    x: number,
    y: number
}

interface Props{
    gridSize: GridSize,
    children: React.ReactElement;
}   

const RobotGrid = (props: Props) => {

    const {x,y} = props.gridSize;


    return <Fragment>
        {/* <Grid2 sx={{
            columns: y,
        }}>
            <div>{x + ", " + y}</div>
        </Grid2> */}
        "Robot Movement area"
         </Fragment>

}

export default RobotGrid