import React from 'react';
import { CssBaseline } from '@mui/material';
import { useScrollTrigger } from '@mui/material';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props: Props) => (
  <React.Fragment>
    <CssBaseline />
    <ElevationScroll {...props}>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' component='div'>
            Robot Vacuum
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  </React.Fragment>
);

export default Header;
