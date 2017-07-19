import Immutable from 'immutable';
import { handleActions } from 'redux-actions';
import { not } from 'ramda';

import {
  setChartZoom,
  setChartWidth,
  initChart,
  setMousePosition,
  setToolbarMode,
  toggleAverageStandards
} from 'actions/UI';

import {
  DEFAULT_CHART_WIDTH
} from 'constants/Chart';

import {
  NONE_MODE
} from 'constants/Toolbar';

const {
  fromJS
} = Immutable;

function mapChartConfig(config) {
  return Immutable.Map()
    .set('height', config.get('height'))
    .set('margins', config.get('margins'))
    .set('axes', config.get('axes'));
}

function mapTransform(transform) {
  const { x, y, k } = transform;
  return { x, y, k };
}

const initialState = fromJS({
  charts: {},
  toolbar: {
    mode: NONE_MODE,
    params: []
  },
  mouse: {
    position: {
      x: 0,
      y: 0
    }
  },
  shouldAverageStandards: false
});

const initChartState = fromJS({
  zoom: {
    transform: {
      x: 0,
      y: 0,
      k: 1
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
    const { name, transform } = action.payload;
    return state.setIn(
      ['charts', name, 'zoom', 'transform'],
      fromJS(mapTransform(transform))
    );
  },
  [setChartWidth]: (state, action) => {
    const { name, width } = action.payload;
    return state.setIn(['charts', name, 'width'], width);
  },
  [setMousePosition]: (state, action) => {
    const { position } = action.payload;
    return state.setIn(['mouse', 'position'], fromJS(position));
  },
  [setToolbarMode]: (state, action) => {
    const { mode, params } = action.payload;
    return state
      .setIn(['toolbar', 'mode'], mode)
      .setIn(['toolbar', 'params'], fromJS(params));
  },
  [toggleAverageStandards]: state => state.update('shouldAverageStandards', not)
}, initialState);

export default UI;
