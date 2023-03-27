import { Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { Fragment, ReactFragment } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { LocationAlias, RobotFacing } from '../utils/robotMovements';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

export type GridSize = {
  x: number;
  y: number;
};

interface Props {
  gridSize: GridSize;
  children: React.ReactElement;
  location: LocationAlias;
  facing: RobotFacing;
}

const RobotGrid = (props: Props) => {
  const { x, y } = props.gridSize;
  console.log('x: ', x, 'y: ', y);
  const { location, facing } = props;
  console.log(props);

  const robotIconRotation = (facing: RobotFacing | null) => {
    let rotateString = 'rotate(0)';
    if (facing) {
      switch (facing) {
        case RobotFacing.east: {
          break;
        }
        case RobotFacing.north: {
          rotateString = 'rotate(-90deg)';
          break;
        }
        case RobotFacing.south: {
          rotateString = 'rotate(90deg)';
          break;
        }
        case RobotFacing.west: {
          rotateString = 'rotate(180deg)';
          break;
        }
      }
    }
    return rotateString;
  };

  return (
    <Fragment>
      <Container sx={{ display: 'flex', flexDirection: 'row' }}>
        {[...new Array(x + 1)].map((item: number, xLocationIndex: number) => {
          return (
            <Container key={`x_${xLocationIndex}`} sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
              {[...new Array(y + 1)].map((columnItem: number, yLocationIndex: number) => {
                return (
                  <Box
                    key={`x_${xLocationIndex}_y_${yLocationIndex}`}
                    sx={{ border: '1px solid #000' }}>
                    {xLocationIndex + ', ' + yLocationIndex}
                    {location && location.x == xLocationIndex && location.y == yLocationIndex && (
                      <Box>
                        <PlayCircleFilledWhiteIcon
                          sx={{
                            transform: robotIconRotation(facing),
                          }}></PlayCircleFilledWhiteIcon>
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Container>
          );
        })}
      </Container>
    </Fragment>
  );
};

export default RobotGrid;
