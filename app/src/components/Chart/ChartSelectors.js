import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  getXScale,
  getYScale
} from './ChartUtils';

export {
  getChartStateFactory,
  getXScaleFactory,
  getYScaleFactory
};

export const getChartStateFromRedux = (state, props) =>
  state.UI.getIn(['charts', props.name], Immutable.Map());

function getChartStateFactory() {
  return (props) => props.chart;
}

function getScaleSelectorFactory(domainPath, dimensionPath, marginsPaths, getScaleFn) {
  return (chartStateSelector) => {
    return createSelector(
      [chartStateSelector],
      (chartState) => {
        const domain = chartState.getIn(domainPath);
        const dimension = chartState.getIn(dimensionPath);
        const margin = marginsPaths
          .map(path => chartState.getIn(path))
          .reduce((result, margin) => result + margin, 0);
        return getScaleFn(
          domain && domain.toJS(),
          [0, dimension - margin]
        );
      }
    )
  }
}

const getXScaleFactory = getScaleSelectorFactory(
  ['axes', 'x', 'domain'],
  ['width'],
  [
    ['margins', 'left'],
    ['margins', 'right']
  ],
  getXScale
);

const getYScaleFactory = getScaleSelectorFactory(
  ['axes', 'y', 'domain'],
  ['height'],
  [
    ['margins', 'top'],
    ['margins', 'bottom']
  ],
  getYScale
);