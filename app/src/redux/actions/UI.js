import { createAction } from 'redux-actions';

import {
  NONE_MODE,
  CHART_MOUSE_POSITION_MODE
} from 'constants/Toolbar';

export const initChart = createAction('INIT_CHART');
export const setChartZoom = createAction('SET_CHART_ZOOM');
export const setChartWidth = createAction('SET_CHART_WIDTH');
export const setMousePosition = createAction('SET_MOUSE_POSITION');
export const setToolbarMode = createAction('SET_TOOLBAR_MODE');
export const toggleAverageStandards = createAction('TOGGLE_AVERAGE_STANDARDS');
export const selectCalculationAlgorithm = createAction('SELECT_CALCULATION_ALGORITHM');
export const setChartToolbarMode = createAction('SET_CHART_TOOLBAR_MODE');

export function handleChartMouseMove({ name, position }) {
  return (dispatch, getState) => {
    const toolbarMode = getState().UI.getIn(['toolbar', 'mode'], NONE_MODE);

    if (toolbarMode !== CHART_MOUSE_POSITION_MODE) {
      dispatch(setToolbarMode({
        mode: CHART_MOUSE_POSITION_MODE,
        params: { name }
      }));
    }

    dispatch(setMousePosition({ name, position }));
  };
}

export function handleMoveMouseOutOfChart() {
  return dispatch => dispatch(setToolbarMode({ mode: NONE_MODE }));
}
