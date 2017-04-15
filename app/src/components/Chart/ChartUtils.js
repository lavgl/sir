import { scaleLinear } from 'd3-scale';

import {
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_DOMAIN_X,
  DEFAULT_CHART_DOMAIN_Y
} from 'constants/Chart';

export {
  getWidth,
  getXScale,
  getYScale,
  isReady,
  getBottomAxisTransform,
  getLeftAxisTransform,
  getElementsTransform,
  getMousePosition,
  isPositionInsideChart
}

function getWidth(element) {
  return element.getBoundingClientRect().width;
}

function getScaleFabric(defaultDomain, defaultRange) {
  return (domain = defaultDomain, range = defaultRange) => {
    return scaleLinear()
      .domain(domain)
      .range(range);
  }
}

const getXScale = getScaleFabric(DEFAULT_CHART_DOMAIN_X, [0, DEFAULT_CHART_WIDTH]);
const getYScale = getScaleFabric(DEFAULT_CHART_DOMAIN_Y, [0, DEFAULT_CHART_HEIGHT]);


function isReady(props) {
  return props.chart && props.chart.size !== 0;
}

function getBottomAxisTransform(config) {
  const height = config.get('height');
  const marginTop = config.getIn(['margins', 'top']);
  const marginLeft = config.getIn(['margins', 'left']);
  return `translate(${marginLeft}, ${height - marginTop})`;
}

function getLeftAxisTransform(config) {
  const margins = config.get('margins');
  const marginLeft = margins.get('left');
  const marginTop = margins.get('top');
  return `translate(${marginLeft}, ${marginTop})`;
}

function getElementsTransform(config) {
  const margins = config.get('margins');
  const marginLeft = margins.get('left');
  const marginTop = margins.get('top');
  return `translate(${marginLeft}, ${marginTop})`;
}

function getMousePosition(config, xScale, yScale, nativeEvent) {
  const margins = config.get('margins');
  const marginLeft = margins.get('left');
  const marginTop = margins.get('top');
  const { offsetX, offsetY } = nativeEvent;
  return {
    x: xScale.invert(offsetX - marginLeft),
    y: yScale.invert(offsetY - marginTop)
  };
}

function isPositionInsideChart(position, xScale, yScale) {
  const [ fromX, toX ] = xScale.domain();
  // y scale is inverted
  const [ toY, fromY ] = yScale.domain();

  const { x, y } = position;

  return x > fromX && x < toX && y > fromY && y < toY;
}