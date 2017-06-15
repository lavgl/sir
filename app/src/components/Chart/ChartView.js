import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';
import elementResizeDetectorMaker from 'element-resize-detector';
import { axisLeft, axisBottom } from 'd3-axis';
import { event, select } from 'd3-selection';

import Axis from './Axis';
import Layout from './Layout';
import Grid from './Grid';

import {
  getWidth,
  getBottomAxisTransform,
  getLeftAxisTransform,
  getMousePosition,
  isPositionInsideChart,
  makeZoom,
  getInnerSvgProps
} from './ChartUtils';

const erd = elementResizeDetectorMaker({
  strategy: 'scroll'
});

@PureRender
class ChartView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    setChartWidth: PropTypes.func.isRequired,
    setChartZoom: PropTypes.func.isRequired,
    handleChartMouseMove: PropTypes.func.isRequired,
    handleMoveMouseOutOfChart: PropTypes.func.isRequired,
    transformString: PropTypes.string.isRequired,
    transformObject: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.makeRef = this.makeRef.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.zoomListener = this.zoomListener.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  makeRef(ref) {
    this.chart = ref;
  }

  resizeListener(element) {
    this.props.setChartWidth({
      name: this.props.name,
      width: getWidth(element)
    });
  }

  zoomListener() {
    this.props.setChartZoom({
      name: this.props.name,
      transform: event.transform
    });
  }

  handleMouseMove(e) {
    const { xScale, yScale, transformObject } = this.props;

    const transformedXScale = transformObject.rescaleX(xScale);
    const transformedYScale = transformObject.rescaleY(yScale);

    const position = getMousePosition(
      this.props.config,
      transformedXScale,
      transformedYScale,
      e.nativeEvent
    );

    if (isPositionInsideChart(
        position,
        transformedXScale,
        transformedYScale)) {

      this.props.handleChartMouseMove({
        name: this.props.name,
        position
      });

    } else {
      this.props.handleMoveMouseOutOfChart();
    }
  }

  componentDidMount() {
    erd.listenTo(this.chart, this.resizeListener);
    select(this.chart).call(makeZoom(this.zoomListener));
  }

  componentWillUnmount() {
    erd.removeListener(this.chart, this.resizeListener);
  }

  render() {
    const { xScale, yScale, config } = this.props;
    const rescaledX = this.props.transformObject.rescaleX(xScale);
    const rescaledY = this.props.transformObject.rescaleY(yScale);

    return (
      <div
        ref = {this.makeRef}
        style={{ height: '100%' }}
        onMouseMove = {this.handleMouseMove}
        onMouseLeave = {this.props.handleMoveMouseOutOfChart}
      >
        <svg width = '100%' height = '100%'>
          <g transform = {getLeftAxisTransform(config)}>
            <Grid
              xScale = {rescaledX}
              yScale = {rescaledY}
            />
          </g>
          <svg {...getInnerSvgProps(config)}>
            <g transform = {this.props.transformString}>
              <Layout
                data = {this.props.data}
                config = {this.props.config}
                xScale = {xScale}
                yScale = {yScale}
              />
            </g>
          </svg>
          <Axis
            scale = {rescaledY}
            axisFn = {axisLeft}
            transformString = {getLeftAxisTransform(config)}
          />
          <Axis
            scale = {rescaledX}
            axisFn = {axisBottom}
            transformString = {getBottomAxisTransform(config)}
          />
        </svg>
      </div>
    );
  }
}

export default ChartView;