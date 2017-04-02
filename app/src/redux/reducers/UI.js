import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  setChartZoom
} from 'actions/UI';

const initialState = Immutable.fromJS({
  chart: {
    zoom: {
      x: 0,
      y: 0,
      k: 1
    }
  }
});

const UI = handleActions({
  [setChartZoom]: (state, action) => {
    const { k } = action.payload;
    return state.setIn(['chart', 'zoom', k], k);
  }
}, initialState);

export default UI;