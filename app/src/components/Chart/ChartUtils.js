import { scaleLinear } from 'd3-scale';
import { zoom, zoomIdentity } from 'd3-zoom';

import {
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_DOMAIN_X,
  DEFAULT_CHART_DOMAIN_Y,
  DEFAULT_SCALE_EXTENT,
  DEFAULT_SCALE_TRANSLATE
} from 'constants/Chart';

export {
  getWidth,
  getXScale,
  getYScale,
  isReady,
  getBottomAxisTransform,
  getLeftAxisTransform,
  getElementsTranslate,
  getMousePosition,
  isPositionInsideChart,
  makeZoom,
  getTransformObject,
  getInnerSvgProps
}

function getWidth(element) {
  return element.getBoundingClientRect().width;
}

function getScaleFabric(defaultDomain, defaultRange) {
  return (domain = defaultDomain, range = defaultRange) => {
    return scaleLinear()
      .domain(domain)
      .range(range)
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

function getElementsTranslate(config) {
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

function makeZoom(handler) {
  return zoom()
    .scaleExtent(DEFAULT_SCALE_EXTENT)
    .translateExtent(DEFAULT_SCALE_TRANSLATE)
    .on('zoom', handler);
}

function getTransformObject({ x, y, k }) {
  return zoomIdentity.translate(x, y).scale(k);
}

function getInnerSvgProps(config) {
  const margins = config.get('margins').toJS();
  return {
    width: config.get('width') - margins.left - margins.right,
    height: config.get('height') - margins.top - margins.bottom
  };

}
