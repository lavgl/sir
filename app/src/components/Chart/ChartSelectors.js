import { createSelector } from 'reselect';

export const getChartState = (state, props) => state.UI.getIn(['charts', props.name]);
