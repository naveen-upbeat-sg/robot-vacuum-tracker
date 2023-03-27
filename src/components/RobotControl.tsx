import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Container, Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  multiLineCommandsEvaluate,
  newFacingOnRotation,
  RobotFacing,
  RobotRotate,
} from '../utils/robotMovements';
import { RobotActionCommand } from '../reducers';
import { RobotStateType } from '../store';

interface Props {
  state: RobotStateType;
  dispatch: React.Dispatch<any>;
}

const RobotControl = (props: any) => {
  const { gridSize, location, facing } = props.state;
  // const [facingState, setFacingState] = useState('');
  // const [xLocation, setXLocation] = useState(location?.x || '0');
  // const [yLocation, setYLocation] = useState(location?.y || '0');
  // const [multiLineCommands, setMultiLineCommands] = useState('');

  const [uiState, setUiState] = useState({
    xLocation: location?.x || 0,
    yLocation: location?.y || 0,
    robotFacing: facing || RobotFacing.east,
    multiLineCommands: '',
  });

  useEffect(() => {
    // props.state.location ? setXLocation(props.state.location?.x) : void 0;
    // props.state.location ? setYLocation(props.state.location?.y) : void 0;
    const { location, facing } = props.state;
    setUiState({
      ...uiState,
      xLocation: location?.x,
      yLocation: location?.y,
      robotFacing: facing,
    });
  }, [props.state]);

  // useEffect(() => {
  //   props.state.facing ? setFacingState(props.state.facing) : void 0;
  // }, [props.state.facing]);

  const handleSetPlace = useCallback(
    (
      xLocationUpdate?: string | number,
      yLocationUpdate?: string | number,
      facingUpdate?: string | RobotFacing
    ) => {
      const { xLocation, yLocation, robotFacing } = uiState;
      props.dispatch({
        type: RobotActionCommand.place,
        payload: {
          location: { x: xLocationUpdate || xLocation, y: yLocationUpdate || yLocation },
          facing: facingUpdate || robotFacing,
          gridSize,
        },
      });
    },
    [uiState]
  );

  const handleSetMove = useCallback(() => {
    const { xLocation, yLocation, robotFacing } = uiState;
    props.dispatch({
      type: RobotActionCommand.move,
      payload: {
        location: {
          x: xLocation,
          y: yLocation,
        },
        facing: robotFacing,
        gridSize,
      },
    });
  }, [uiState]);

  const handleSetRotate = (
    rotate: RobotActionCommand.rotateLeft | RobotActionCommand.rotateRight
  ) => {
    props.dispatch({
      type: rotate,
      payload: {
        facing: uiState.robotFacing,
      },
    });
  };

  const handleReportClick = () => {
    props.dispatch({
      type: RobotActionCommand.report,
      payload: {
        location: {
          x: uiState.xLocation,
          y: uiState.yLocation,
        },
        facing: uiState.robotFacing,
      },
    });
  };

  const multiLineCommandOnChange = (e: any) => {
    setUiState({ ...uiState, multiLineCommands: e.target.value as string });
  };

  const handleMultiLineCommandsEnter = () => {
    //const multiLineCommandsFromState = uiState.multiLineCommands.split('\n');
    const result = multiLineCommandsEvaluate(uiState.multiLineCommands, props.state.gridSize);

    props.dispatch({
      type: RobotActionCommand.multiCommandReport,
      payload: {
        result,
        commands: uiState.multiLineCommands.split('\n'),
      },
    });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'stretch',
      }}>
      <Typography variant='h4' sx={{ flex: 1, justifyContent: 'center', display: 'flex' }}>
        Robot Commands
      </Typography>
      <Box>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label='Enter commands at once'
            multiline
            rows={4}
            defaultValue='PLACE 0,0,NORTH'
            variant='filled'
            onChange={multiLineCommandOnChange}
            sx={{
              marginBottom: '15px',
              width: '100%',
            }}
          />
          <Button
            variant='contained'
            sx={{ flex: '1', marginBottom: '15px' }}
            onClick={(_) => handleMultiLineCommandsEnter()}>
            Enter
          </Button>
        </Container>
      </Box>

      <Divider sx={{ minWidth: '20px' }} />

      <Typography variant='h6'>- OR -</Typography>

      <Divider sx={{ minWidth: '20px' }} />

      <Box sx={{ padding: '20px', flex: '1' }}>
        <Container sx={{ display: 'flex' }}>
          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* <Container sx={{ display: 'flex' }}> */}
            {/* <Typography variant='body1'>x:</Typography> */}
            <Box sx={{ padding: '5px' }}>
              <TextField
                id='standard-basic'
                label='X: '
                variant='standard'
                value={uiState.xLocation}
                onChange={(e) =>
                  setUiState({ ...uiState, xLocation: Number(e.target.value) as number })
                }
              />
            </Box>
            {/* </Container> */}

            <Box sx={{ padding: '5px' }}>
              <TextField
                id='standard-basic'
                label='Y: '
                variant='standard'
                value={uiState.yLocation}
                onChange={(e) =>
                  setUiState({ ...uiState, yLocation: Number(e.target.value) as number })
                }
              />
            </Box>
            <Box sx={{ padding: '5px' }}>
              {/* <TextField id='standard-basic' label='Facing: ' variant='standard' /> */}
              <Select
                id='demo-simple-select'
                value={uiState.robotFacing}
                label='Facing'
                onChange={(e) =>
                  setUiState({ ...uiState, robotFacing: e.target.value as RobotFacing })
                }>
                <MenuItem value={RobotFacing.north}>{RobotFacing.north}</MenuItem>
                <MenuItem value={RobotFacing.east}>{RobotFacing.east}</MenuItem>
                <MenuItem value={RobotFacing.south}>{RobotFacing.south}</MenuItem>
                <MenuItem value={RobotFacing.west}>{RobotFacing.west}</MenuItem>
              </Select>
            </Box>
          </Container>
          <Button variant='contained' onClick={(_) => handleSetPlace()}>
            Place
          </Button>
        </Container>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flex: '1',
        }}>
        <Button variant='contained' onClick={handleSetMove} sx={{ flex: '1' }}>
          Move
        </Button>
      </Box>

      <Box sx={{ padding: '20px', flex: '1' }}>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', flex: '1' }}
          disableGutters>
          <Typography variant='h6' sx={{ justifyContent: 'left' }}>
            Rotate
          </Typography>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: '1',
            }}
            disableGutters>
            <Button
              sx={{ marginRight: '5px', flex: '1' }}
              variant='contained'
              onClick={() => handleSetRotate(RobotActionCommand.rotateLeft)}>
              Left
            </Button>
            <Button
              sx={{ flex: '1', marginLeft: '5px' }}
              variant='contained'
              onClick={() => handleSetRotate(RobotActionCommand.rotateRight)}>
              Right
            </Button>
          </Container>
        </Container>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          flex: '1',
        }}
        flex={1}>
        <Button variant='contained' sx={{ flex: '1' }} onClick={handleReportClick}>
          Report
        </Button>
      </Box>
    </Container>
  );
};

export default RobotControl;
