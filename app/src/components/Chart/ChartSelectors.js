import Immutable from 'immutable';
import { createSelector } from 'reselect';

import {
  getXScale,
  getYScale,
  getTransformObject
} from './ChartUtils';

export {
  getChartStateFactory,
  getXScaleFactory,
  getYScaleFactory,
  getZoomTransformFactory,
  getConfigFactory,
  getTransformStringFactory,
  getTransformObjectFactory
};

export const getChartStateFromRedux = (state, props) =>
  state.UI.getIn(['charts', props.name], Immutable.Map());

function getChartStateFactory() {
  return (props) => props.chart;
}

function getConfigFactory() {
  return (props) => props.config;
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

function getZoomTransformFactory(chartStateSelector) {
  return createSelector(
    [chartStateSelector],
    (chartState) => chartState.getIn(['zoom', 'transform'])
  );
}

function getTransformStringFactory(zoomTransformSelector, configSelector) {
  return createSelector(
    [zoomTransformSelector, configSelector],
    (transform, config) => {
      const margins = config.get('margins');
      const marginTop = margins.get('top');
      const marginLeft = margins.get('left');

      const translateX = `${marginLeft + transform.get('x')}`;
      const translateY = `${marginTop + transform.get('y')}`;

      return `translate(${translateX},${translateY}) scale(${transform.get('k')})`;
    }
  );
}

function getTransformObjectFactory(zoomTransformSelector) {
  return createSelector(
    [zoomTransformSelector],
    (zoomTransform) => getTransformObject(zoomTransform.toJS())
  );
}