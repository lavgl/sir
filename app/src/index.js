/* eslint-disable no-unused-vars */
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

window.React = React;

render(
  <Root prop="lol" />,
  document.getElementById('app'));