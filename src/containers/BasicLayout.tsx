import { SpaceBar } from '@mui/icons-material';
import { Toolbar } from '@mui/material';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import { Container } from '@mui/material';
import { Typography } from '@mui/material';
import { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import RobotControl from '../components/RobotControl';
import RobotGrid, { GridSize } from '../components/RobotGrid';
import { RobotStateType } from '../store';
import { LocationAlias, RobotFacing } from '../utils/robotMovements';

interface Props {
  state: RobotStateType;
  dispatch: React.Dispatch<any>;
}

const BasicLayout = (props: Props) => {
  const { state, dispatch } = props;

  const defaultGridSize: GridSize = {
    x: 4,
    y: 4,
  };

  const defaultLocation: LocationAlias | null = state.location;

  const defaultFacing: RobotFacing | null = state.facing;

  const defaultReportMessage: string = state.reportMessage;

  const defaultCommandHistory: Array<string> = state.commandHistory;

  return (
    <Fragment>
      <Header>
        <div></div>
      </Header>
      <br />
      <Main>
        <Fragment>
          {/* <Typography variant='h5'>Work in progress...</Typography>
          <Typography variant='subtitle1'>Thank you for your patience</Typography> */}
          <Grid container sx={{ minHeight: '100vh' }}>
            <Grid xs={12} md={8} item>
              <Box
                sx={{
                  minHeight: '100%',
                  border: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RobotGrid
                  gridSize={defaultGridSize}
                  location={defaultLocation}
                  facing={defaultFacing}
                  reportMessage={defaultReportMessage}
                  commandHistory={defaultCommandHistory}>
                  <div></div>
                </RobotGrid>
              </Box>
            </Grid>
            <Grid xs={12} md={4} item>
              <Box
                sx={{
                  minHeight: '100%',
                  border: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RobotControl state={state} dispatch={dispatch}></RobotControl>
              </Box>
            </Grid>
          </Grid>
          <Footer></Footer>
        </Fragment>
      </Main>
    </Fragment>
  );
};

export default BasicLayout;
