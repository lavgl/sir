import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setChartZoom,
  setChartWidth,
  initChart,
  setMousePosition
} from 'actions/UI';

import {
  DEFAULT_CHART_WIDTH
} from 'constants/Chart';

const {
  fromJS
} = Immutable;

function mapChartConfig(config) {
  return Immutable.Map()
    .set('height', config.get('height'))
    .set('margins', config.get('margins'))
    .set('axes', config.get('axes'));
}

const initialState = fromJS({
  charts: {}
});

const initChartState = fromJS({
  zoom: {
    x: 0,
    y: 0,
    k: 1
  },
  mouse: {
    position: {
      x: 0,
      y: 0
    }
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
  },
  [setMousePosition]: (state, action) => {
    const { name, position } = action.payload;
    return state.setIn(['charts', name, 'mouse', 'position'], fromJS(position));
  }
}, initialState);

export default UI;