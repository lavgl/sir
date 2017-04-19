import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './redux/store/configureStore';

import 'bootstrap/dist/css/bootstrap.css';
import './main.css';

window.React = React;

const store = configureStore();

render(
  <Root store = {store} />,
  document.getElementById('app'));