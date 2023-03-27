import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Container, Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { multiLineCommandsEvaluate, RobotFacing } from '../utils/robotMovements';
import { RobotActionCommand } from '../reducers';
import { RobotStateType } from '../store';

interface Props {
  state: RobotStateType;
  dispatch: React.Dispatch<any>;
}

const RobotControl = (props: any) => {
  const { gridSize, location, facing } = props.state;

  const [localUIState, setUiState] = useState({
    xLocation: location?.x || 0,
    yLocation: location?.y || 0,
    robotFacing: facing || RobotFacing.east,
    multiLineCommands: '',
  });

  useEffect(() => {
    const { location, facing } = props.state;
    setUiState({
      ...localUIState,
      xLocation: location?.x,
      yLocation: location?.y,
      robotFacing: facing,
    });
  }, [props.state]);

  const placeButtonClickHandler = useCallback(
    (
      xLocationUpdate?: string | number,
      yLocationUpdate?: string | number,
      facingUpdate?: string | RobotFacing
    ) => {
      const { xLocation, yLocation, robotFacing } = localUIState;
      props.dispatch({
        type: RobotActionCommand.place,
        payload: {
          location: { x: xLocationUpdate || xLocation, y: yLocationUpdate || yLocation },
          facing: facingUpdate || robotFacing,
          gridSize,
        },
      });
    },
    [localUIState]
  );

  const moveButtonClickHandler = useCallback(() => {
    const { xLocation, yLocation, robotFacing } = localUIState;
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
  }, [localUIState]);

  const rotateButtonClickHandler = useCallback(
    (rotate: RobotActionCommand.rotateLeft | RobotActionCommand.rotateRight) => {
      props.dispatch({
        type: rotate,
        payload: {
          facing: localUIState.robotFacing,
        },
      });
    },
    [localUIState]
  );

  const reportButtonClickHanler = useCallback(() => {
    props.dispatch({
      type: RobotActionCommand.report,
      payload: {
        location: {
          x: localUIState.xLocation,
          y: localUIState.yLocation,
        },
        facing: localUIState.robotFacing,
      },
    });
  }, [localUIState]);

  const multiLineCommandChangeHandler = useCallback(
    (e: any) => {
      setUiState({ ...localUIState, multiLineCommands: e.target.value as string });
    },
    [localUIState]
  );

  const enterButtonClickHandler = useCallback(() => {
    const result = multiLineCommandsEvaluate(localUIState.multiLineCommands, props.state.gridSize);
    props.dispatch({
      type: RobotActionCommand.multiCommandReport,
      payload: {
        result,
        commands: localUIState.multiLineCommands.split('\n'),
      },
    });
  }, [localUIState]);

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
            onChange={multiLineCommandChangeHandler}
            sx={{
              marginBottom: '15px',
              width: '100%',
            }}
          />
          <Button
            variant='contained'
            sx={{ flex: '1', marginBottom: '15px' }}
            onClick={(_) => enterButtonClickHandler()}>
            Enter
          </Button>
        </Container>
      </Box>

      <Divider sx={{ minWidth: '20px' }} />

      <Typography variant='h6' sx={{ display: 'flex', justifyContent: 'center' }}>
        - OR -
      </Typography>

      <Divider sx={{ minWidth: '20px' }} />

      <Box sx={{ padding: '20px', flex: '1' }}>
        <Container sx={{ display: 'flex' }}>
          <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ padding: '5px' }}>
              <TextField
                id='standard-basic'
                label='X: '
                variant='standard'
                value={localUIState.xLocation}
                onChange={(e) =>
                  setUiState({ ...localUIState, xLocation: Number(e.target.value) as number })
                }
              />
            </Box>
            {/* </Container> */}

            <Box sx={{ padding: '5px' }}>
              <TextField
                id='standard-basic'
                label='Y: '
                variant='standard'
                value={localUIState.yLocation}
                onChange={(e) =>
                  setUiState({ ...localUIState, yLocation: Number(e.target.value) as number })
                }
              />
            </Box>
            <Box sx={{ padding: '5px' }}>
              {/* <TextField id='standard-basic' label='Facing: ' variant='standard' /> */}
              <Select
                id='demo-simple-select'
                value={localUIState.robotFacing || ''}
                label='Facing'
                onChange={(e) =>
                  setUiState({ ...localUIState, robotFacing: e.target.value as RobotFacing })
                }>
                <MenuItem value={RobotFacing.north}>{RobotFacing.north}</MenuItem>
                <MenuItem value={RobotFacing.east}>{RobotFacing.east}</MenuItem>
                <MenuItem value={RobotFacing.south}>{RobotFacing.south}</MenuItem>
                <MenuItem value={RobotFacing.west}>{RobotFacing.west}</MenuItem>
              </Select>
            </Box>
          </Container>
          <Button variant='contained' onClick={(_) => placeButtonClickHandler()}>
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
        <Button variant='contained' onClick={moveButtonClickHandler} sx={{ flex: '1' }}>
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
              onClick={() => rotateButtonClickHandler(RobotActionCommand.rotateLeft)}>
              Left
            </Button>
            <Button
              sx={{ flex: '1', marginLeft: '5px' }}
              variant='contained'
              onClick={() => rotateButtonClickHandler(RobotActionCommand.rotateRight)}>
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
        <Button variant='contained' sx={{ flex: '1' }} onClick={reportButtonClickHanler}>
          Report
        </Button>
      </Box>
    </Container>
  );
};

export default RobotControl;
