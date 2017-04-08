import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setChartZoom,
  setChartWidth,
  initChart
} from 'actions/UI';

import {
  DEFAULT_CHART_WIDTH
} from 'constants/Chart';

const initialState = Immutable.fromJS({
  charts: {}
});


const initChartState = Immutable.fromJS({
  zoom: {
    x: 0,
    y: 0,
    k: 1
  },
  width: DEFAULT_CHART_WIDTH
});

const UI = handleActions({
  [initChart]: (state, action) => {
    const { name, config } = action.payload;
    const height = config.get('height');
    const axes = config.get('axes');
    return state.setIn(['charts', name],
      initChartState
        .set('height', height)
        .set('axes', axes));
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