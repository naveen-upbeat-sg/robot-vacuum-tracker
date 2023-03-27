import React, { Fragment, useEffect, useState } from 'react';

import { Container, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { newFacingOnRotation, RobotFacing, RobotRotate } from '../utils/robotMovements';
import { RobotActionCommand } from '../reducers';
import { RobotStateType } from '../store';

interface Props {
  state: RobotStateType;
  dispatch: React.Dispatch<any>;
}

const RobotControl = (props: any) => {
  const { gridSize, location } = props.state;
  const [facing, setFacing] = useState(RobotFacing.east);
  const [xLocation, setXLocation] = useState(location?.x || 0);
  const [yLocation, setYLocation] = useState(location?.y || 0);

  useEffect(() => {
    setXLocation(props.state.location?.x);
    setYLocation(props.state.location?.y);
    setFacing(props.state.facing);
  }, [props.state]);

  const handleSetPlace = () => {
    props.dispatch({
      type: RobotActionCommand.place,
      payload: {
        location: { x: xLocation, y: yLocation },
        facing,
        gridSize,
      },
    });
  };

  const handleSetMove = () => {
    props.dispatch({
      type: RobotActionCommand.move,
      payload: {
        location: {
          x: xLocation,
          y: yLocation,
        },
        facing,
        gridSize,
      },
    });
  };

  const handleSetRotate = (
    rotate: RobotActionCommand.rotateLeft | RobotActionCommand.rotateRight
  ) => {
    //const nextFacing = newFacingOnRotation(rotate, facing);
    props.dispatch({
      type: rotate,
      payload: {
        facing,
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
                // value={xLocation}
                onChange={(e) => setXLocation(Number(e.target.value) as number)}
              />
            </Box>
            {/* </Container> */}

            <Box sx={{ padding: '5px' }}>
              <TextField
                id='standard-basic'
                label='Y: '
                variant='standard'
                // value={yLocation}
                onChange={(e) => setYLocation(Number(e.target.value) as number)}
              />
            </Box>
            <Box sx={{ padding: '5px' }}>
              {/* <TextField id='standard-basic' label='Facing: ' variant='standard' /> */}
              <Select
                id='demo-simple-select'
                // value={facing || RobotFacing.east}
                label='Facing'
                onChange={(e) => setFacing(e.target.value as RobotFacing)}>
                <MenuItem value={RobotFacing.north}>{RobotFacing.north}</MenuItem>
                <MenuItem value={RobotFacing.east}>{RobotFacing.east}</MenuItem>
                <MenuItem value={RobotFacing.south}>{RobotFacing.south}</MenuItem>
                <MenuItem value={RobotFacing.west}>{RobotFacing.west}</MenuItem>
              </Select>
            </Box>
          </Container>
          <Button variant='contained' onClick={handleSetPlace}>
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
        <Button variant='contained' sx={{ flex: '1' }}>
          Report
        </Button>
      </Box>
    </Container>
  );
};

export default RobotControl;
