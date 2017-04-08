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

function getScaleSelectorFactory(domainPath, dimensionPath, getScaleFn) {
  return (chartStateSelector) => {
    return createSelector(
      [chartStateSelector],
      (chartState) => {
        const domain = chartState.getIn(domainPath);
        const dimension = chartState.getIn(dimensionPath);
        return getScaleFn(
          domain && domain.toJS(),
          [0, dimension]
        );
      }
    )
  }
}

const getXScaleFactory = getScaleSelectorFactory(
  ['axes', 'x', 'domain'],
  ['width'],
  getXScale
);

const getYScaleFactory = getScaleSelectorFactory(
  ['axes', 'y', 'domain'],
  ['height'],
  getYScale
);

// function getXScaleFactory(chartStateSelector) {
//   return createSelector(
//     [chartStateSelector],
//     (chartState) => {
//       const domain = chartState.getIn(['axes', 'x', 'domain']);
//       return getScale(
//         domain && domain.toJS(),
//         [0, chartState.get('width')]
//       );
//     }
//   );
// }
