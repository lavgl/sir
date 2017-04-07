import { scaleLinear } from 'd3-scale';

export {
  getWidth,
  getScale
}

function getWidth(element) {
  return element.getBoundingClientRect().width;
}

function getScale(domain, scale) {
  return scaleLinear()
    .domain(domain)
    .range(scale);
}