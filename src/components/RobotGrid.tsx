import React, { Fragment, ReactFragment } from 'react';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import { LocationAlias, RobotFacing } from '../utils/robotMovements';
// import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import NorthIcon from '@mui/icons-material/North';
import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';
import WestIcon from '@mui/icons-material/West';

export type GridSize = {
  x: number;
  y: number;
};

interface CommandHistoryProps {
  commandHistory: Array<string>;
}

const CommandHistory = (props: CommandHistoryProps) => {
  const { commandHistory } = props;
  return (
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
        data-test-id="command-history-box"
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
  );
};

interface CommandReportProps {
  reportMessage: string;
}

const CommandReport = (props: CommandReportProps) => {
  const { reportMessage } = props;
  return (
    <Container
      data-test-id={'command-report-container'}
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
        data-test-id="command-report-box"
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
  );
};

interface Props {
  gridSize: GridSize;
  children: React.ReactElement;
  location: LocationAlias;
  facing: RobotFacing;
  reportMessage: string;
  commandHistory: Array<string>;
}

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

const RobotGrid = (props: Props) => {
  const { x, y } = props.gridSize;
  const { location, facing, reportMessage, commandHistory } = props;

  return (
    <Fragment>
      <Container
        data-test-id={'robo-grid-container'}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'15px' }}>
        <Typography variant='h4'>
          Robot Grid
        </Typography>
        <Container sx={{display:'flex', flexDirection:'row'}}>
          <Container sx={{display:'flex', flex:'0.3', flexDirection:'column', justifyContent:'space-between'}} disableGutters>
            <Box> <WestIcon />West </Box>
            <Box>South<SouthIcon /></Box>
          </Container>
          <Container sx={{display: 'flex',flexDirection: 'row', marginBottom: '20px', margin:'5px' }} disableGutters>
            {[...new Array(x + 1)].map((item: number, xLocationIndex: number) => {
              return (
                <Container
                  key={`x_${xLocationIndex}`}
                  data-test-id={`x_${xLocationIndex}`}
                  sx={{ display: 'flex', flexDirection: 'column-reverse' }}
                  disableGutters>
                  {[...new Array(y + 1)].map((columnItem: number, yLocationIndex: number) => {
                    return (
                      <Box
                        key={`x_${xLocationIndex}_y_${yLocationIndex}`}
                        data-test-id={`x_${xLocationIndex}_y_${yLocationIndex}`}
                        sx={{
                          border: '1px dotted #000',
                          height: '80px',
                          widht: 'auto',
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
                        {location &&
                          location.x == xLocationIndex &&
                          location.y == yLocationIndex && (
                            <Box
                              sx={{
                                height: '80px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              {/* <PlayCircleFilledWhiteIcon
                            sx={{
                              transform: robotIconRotation(facing),
                            }}></PlayCircleFilledWhiteIcon> */}
                              <Box data-test-id={'robotic-image-container'}>
                                <img
                                  style={{
                                    maxHeight: '45px',
                                    transform: robotIconRotation(facing),
                                  }}
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
          <Container sx={{display:'flex', flex:'0.3', flexDirection:'column', justifyContent:'space-between'}} disableGutters>
            <Box><NorthIcon />North</Box>
            <Box>East<EastIcon /></Box>
          </Container>
          
        </Container>

        <Divider />

        <Container data-test-id="command-report-and-history-container" sx={{ display: 'flex', flex: '1', justifyContent: 'space-between' }}>
          <CommandReport reportMessage={reportMessage}></CommandReport>
          <CommandHistory commandHistory={commandHistory}></CommandHistory>
        </Container>
      </Container>
    </Fragment>
  );
};

export default RobotGrid;
