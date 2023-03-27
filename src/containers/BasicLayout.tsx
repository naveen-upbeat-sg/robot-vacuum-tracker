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

const BasicLayout = () => {
  const gridSize: GridSize = {
    x: 4,
    y: 4,
  };

  return (
    <Fragment>
      <Header>
        <div></div>
      </Header>
      <br />
      <Main>
        <Fragment>
          <Typography variant='h5'>Work in progress...</Typography>
          <Typography variant='subtitle1'>Thank you for your patience</Typography>
          <Grid container sx={{ minHeight: '100vh' }}>
            <Grid xs={12} md={8}>
              <Box
                sx={{
                  minHeight: '100%',
                  border: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center'
                }}>
                <RobotGrid gridSize={gridSize}>
                  <div></div>
                </RobotGrid>
              </Box>
            </Grid>
            <Grid xs={12} md={4}>
              <Box
                sx={{
                  minHeight: '100%',
                  border: '1px solid #000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems:'center'
                }}>
                <RobotControl></RobotControl>
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
