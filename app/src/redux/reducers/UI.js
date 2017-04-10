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

function mapChartConfig(config) {
  return Immutable.Map()
    .set('height', config.get('height'))
    .set('margins', config.get('margins'))
    .set('axes', config.get('axes'));
}

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
      initChartState.merge(mapChartConfig(config)));
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