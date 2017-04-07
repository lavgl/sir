import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setChartZoom,
  setChartWidth,
  initChart
} from 'actions/UI';

const initialState = Immutable.fromJS({
  charts: {}
});

const initChartState = Immutable.fromJS({
  zoom: {
    x: 0,
    y: 0,
    k: 1
  },
  width: 100
});

const UI = handleActions({
  [initChart]: (state, action) => {
    const { name } = action.payload;
    return state.setIn(['charts', name], initChartState);
  },
  [setChartZoom]: (state, action) => {
    const { name, k } = action.payload;
    return state.setIn(['charts', name, 'zoom', k], k);
  },
  [setChartWidth]: (state, action) => {
    const { name, width } = action.payload;
    return state.setIn(['charts', name, 'width'], width);
  }
}, initialState);

export default UI;