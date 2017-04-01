import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/store/configureStore';

window.React = React;

const store = configureStore();

render(
  <Root store = {store} />,
  document.getElementById('app'));