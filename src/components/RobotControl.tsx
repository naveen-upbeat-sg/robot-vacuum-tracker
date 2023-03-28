import React, { Fragment, useCallback, useEffect, useState } from 'react';

import { Container, Box, Divider, InputLabel, FormControl } from '@mui/material';
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
    multiLineCommands: 'PLACE 0,0,NORTH',
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
      setUiState({
        ...localUIState,
        multiLineCommands: e.target.value,
      });
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
      data-test-id='robot-commands-container'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        justifyItems: 'stretch',
        gap: '10px',
      }}>
      <Typography
        variant='h4'
        sx={{ flex: 1, justifyContent: 'center', display: 'flex', marginBottom: '10px' }}>
        Robot Commands
      </Typography>

      <Box>
        <Container
          data-test-id='multiple-commands-container'
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          disableGutters>
          <TextField
            label='Enter commands at once'
            data-test-id='multi-commands-box'
            multiline
            rows={4}
            defaultValue='PLACE 0,0,NORTH'
            value={localUIState.multiLineCommands}
            variant='filled'
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              (e.target.value = ('' + e.target.value).toUpperCase())
            }
            onChange={multiLineCommandChangeHandler}
            sx={{
              marginBottom: '15px',
              width: '100%',
            }}
          />
          <Button
            data-test-id='multi-commands-button'
            variant='contained'
            sx={{ flex: '1', marginBottom: '15px', width: '100%' }}
            onClick={(_) => enterButtonClickHandler()}>
            Enter
          </Button>
        </Container>
      </Box>

      <Divider sx={{ minWidth: '10px' }} />

      <Typography variant='subtitle1' sx={{ display: 'flex', justifyContent: 'center' }}>
        - OR -
      </Typography>

      <Divider sx={{ minWidth: '20px' }} />

      <Box sx={{ flex: '1' }} data-test-id='simple-command-container'>
        <Container sx={{ display: 'flex', gap: '10px' }} disableGutters>
          <Container
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
            disableGutters>
            <Container
              sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}
              disableGutters>
              <Box>
                <TextField
                  id='standard-basic'
                  data-test-id='position-x-box'
                  label='X: '
                  variant='standard'
                  //value={localUIState.xLocation}
                  onChange={(e) =>
                    setUiState({ ...localUIState, xLocation: Number(e.target.value) as number })
                  }
                />
              </Box>
              <Box>
                <TextField
                  data-test-id='position-y-box'
                  label='Y: '
                  variant='standard'
                  //value={localUIState.yLocation}
                  onChange={(e) =>
                    setUiState({ ...localUIState, yLocation: Number(e.target.value) as number })
                  }
                />
              </Box>
            </Container>
            <Box sx={{ display: 'flex', flex: 1, width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Facing</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  data-test-id='facing-select-box'
                  value={localUIState.robotFacing || ''}
                  label='Facing'
                  sx={{
                    width: '100%',
                  }}
                  onChange={(e) =>
                    setUiState({ ...localUIState, robotFacing: e.target.value as RobotFacing })
                  }>
                  <MenuItem value={RobotFacing.north}>{RobotFacing.north}</MenuItem>
                  <MenuItem value={RobotFacing.east}>{RobotFacing.east}</MenuItem>
                  <MenuItem value={RobotFacing.south}>{RobotFacing.south}</MenuItem>
                  <MenuItem value={RobotFacing.west}>{RobotFacing.west}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Container>
          <Button
            data-test-id={'button-place'}
            variant='contained'
            onClick={(_) => placeButtonClickHandler()}>
            Place
          </Button>
        </Container>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '1',
        }}>
        <Button
          data-test-id={'button-move'}
          variant='contained'
          onClick={moveButtonClickHandler}
          sx={{ flex: '1' }}>
          Move
        </Button>
      </Box>

      <Box sx={{ flex: '1' }}>
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
              data-test-id={'turn-left-button'}
              sx={{ marginRight: '5px', flex: '1' }}
              variant='contained'
              onClick={() => rotateButtonClickHandler(RobotActionCommand.rotateLeft)}>
              Left
            </Button>
            <Button
              data-test-id={'turn-right-button'}
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

          flex: '1',
        }}
        flex={1}>
        <Button
          variant='contained'
          data-test-id={'report-button'}
          sx={{ flex: '1' }}
          onClick={reportButtonClickHanler}>
          Report
        </Button>
      </Box>
    </Container>
  );
};

export default RobotControl;
