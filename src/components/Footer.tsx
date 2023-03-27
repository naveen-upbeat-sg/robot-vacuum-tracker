import React, { Fragment } from 'react';

import { Container } from '@mui/material';

const Footer = () => {
  return (
    <Fragment>
      <Container
        sx={{
          display: 'flex',
          padding: '20px',
          justifyContent: 'center',
          backgroundColor: 'GrayText',
          color:'white'
        }}>
        Tech: TypeScript, ReactJS v18, MUI v5
      </Container>
    </Fragment>
  );
};

export default Footer;
