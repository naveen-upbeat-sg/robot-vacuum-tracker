import { Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React, { Fragment, ReactFragment } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { LocationAlias, RobotFacing } from '../utils/robotMovements';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

export type GridSize = {
  x: number;
  y: number;
};

interface Props {
  gridSize: GridSize;
  children: React.ReactElement;
  location: LocationAlias;
  facing: RobotFacing;
  reportMessage: string;
  commandHistory: Array<string>;
}

const RobotGrid = (props: Props) => {
  const { x, y } = props.gridSize;
  //console.log('x: ', x, 'y: ', y);
  const { location, facing, reportMessage, commandHistory } = props;
  //console.log(props);

  const robotIconRotation = (facing: RobotFacing | null) => {
    let rotateString = 'rotate(0)';
    if (facing) {
      switch (facing) {
        case RobotFacing.north: {
          break;
        }
        case RobotFacing.west: {
          rotateString = 'rotate(-90deg)';
          break;
        }
        case RobotFacing.east: {
          rotateString = 'rotate(90deg)';
          break;
        }
        case RobotFacing.south: {
          rotateString = 'rotate(180deg)';
          break;
        }
      }
    }
    return rotateString;
  };

  return (
    <Fragment>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h4'>Robot Grid</Typography>
        <Container sx={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
          {[...new Array(x + 1)].map((item: number, xLocationIndex: number) => {
            return (
              <Container
                key={`x_${xLocationIndex}`}
                sx={{ display: 'flex', flexDirection: 'column-reverse' }}
                disableGutters>
                {[...new Array(y + 1)].map((columnItem: number, yLocationIndex: number) => {
                  return (
                    <Box
                      key={`x_${xLocationIndex}_y_${yLocationIndex}`}
                      sx={{
                        border: '1px dotted #000',
                        minHeight: '50px',
                        minWidth: '50px',
                        backgroundColor:
                          xLocationIndex % 2 == 0
                            ? yLocationIndex % 2 == 0
                              ? 'grey'
                              : 'whitesmoke'
                            : yLocationIndex % 2 == 1
                            ? 'grey'
                            : 'whitesmoke',
                      }}>
                      {/* {xLocationIndex + ', ' + yLocationIndex} */}
                      {location && location.x == xLocationIndex && location.y == yLocationIndex && (
                        <Box
                          sx={{
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <PlayCircleFilledWhiteIcon
                            sx={{
                              transform: robotIconRotation(facing),
                            }}></PlayCircleFilledWhiteIcon> */}
                          <Box sx={{ height: '100%' }}>
                            <img
                              style={{ maxHeight: '45px', transform: robotIconRotation(facing) }}
                              src={window.location.href + 'img/roboticVacuum.png'}
                              alt='robotic-image'></img>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  );
                })}
              </Container>
            );
          })}
        </Container>
        <Divider />
        <Container sx={{ display: 'flex', flex: '1', justifyContent: 'space-between' }}>
          <Container
            sx={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              border: '1px solid #000',
              borderRight: '0px',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Typography variant='h6'>Report</Typography>
            <Box
              sx={{
                border: '1px solid #000',
                flex: 1,
                minHeight: '200px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              {reportMessage}
            </Box>
          </Container>
          <Container
            sx={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
              border: '1px solid #000',
              borderLeft: '0px',
              flexDirection: 'column',
            }}>
            <Typography variant='h6'>Command History</Typography>
            <Box
              sx={{
                border: '1px solid #000',
                flex: 1,
                minHeight: '200px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              {commandHistory.map((cmd: string, cmdIndex: number) => {
                return <Typography variant='body2'>{`${cmdIndex + 1}. ${cmd}`}</Typography>;
              })}
            </Box>
          </Container>
        </Container>
      </Container>
    </Fragment>
  );
};

export default RobotGrid;
