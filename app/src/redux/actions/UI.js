import { createAction } from 'redux-actions';

export const initChart = createAction('INIT_CHART');
export const setChartZoom = createAction('SET_CHART_ZOOM');
export const setChartWidth = createAction('SET_CHART_WIDTH');
export const setMousePosition = createAction('SET_MOUSE_POSITION');