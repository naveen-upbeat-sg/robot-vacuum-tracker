// const sayHelloManyTimes = (times) =>
//   new Array(times).fill(1).map((_, i) => `Hello ${i + 1}`);

// const div = document.createElement("div");

// div.innerHTML =sayHelloManyTimes(10).join("<br/>");
// document.body.append(div);

import { CssBaseline } from '@mui/material';
import React, { Fragment, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import BasicLayout from './containers/BasicLayout';
import appReducer from './reducers';
import initialState from './store';
import { ErrorBoundary } from 'react-error-boundary';

const container = document.getElementById('root');
const root = createRoot(container);
//const HelloNode = <Hello />;

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <Fragment>
      <CssBaseline />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <BasicLayout state={state} dispatch={dispatch} />
      </ErrorBoundary>
    </Fragment>
  );
};

root.render(<App />);
