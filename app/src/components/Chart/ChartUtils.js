import { scaleLinear } from 'd3-scale';

import {
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT,
  DEFAULT_CHART_DOMAIN
} from 'constants/Chart';

export {
  getWidth,
  getXScale,
  getYScale,
  isReady
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

const getXScale = getScaleFabric(DEFAULT_CHART_DOMAIN, [0, DEFAULT_CHART_WIDTH]);
const getYScale = getScaleFabric(DEFAULT_CHART_DOMAIN, [0, DEFAULT_CHART_HEIGHT]);


function isReady(props) {
  return props.chart && props.chart.size !== 0;
}
// function getScale(domain = DEFAULT_CHART_DOMAIN, range = [0, DEFAULT_CHART_WIDTH]) {
//   return scaleLinear()
//     .domain(domain)
//     .range(range);
// }