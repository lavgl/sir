import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import elementResizeDetectorMaker from 'element-resize-detector';
import { axisLeft, axisBottom } from 'd3-axis';
import { event, select } from 'd3-selection';

import Axis from './Axis';

import {
  getWidth,
  getBottomAxisTransform,
  getLeftAxisTransform,
  getMousePosition,
  isPositionInsideChart,
  makeZoom
} from './ChartUtils';

const erd = elementResizeDetectorMaker({
  strategy: 'scroll'
});

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
    return (
      <div
        ref = {this.makeRef}
        style={{ height: '100%' }}
        onMouseMove = {this.handleMouseMove}
        onMouseLeave = {this.props.handleMoveMouseOutOfChart}
      >
        <svg width = '100%' height = '100%'>
          <g>
            {/*{grid will be here}*/}
          </g>
          <g transform = {this.props.transformString}>
            {this.props.data.map(datum => {
              const renderFn = config.getIn(['elements', datum.get('type'), 'render']);
              const d = datum.get('props');
              const x = xScale(d.get('x'));
              const y = yScale(d.get('y'));
              return renderFn({ x, y }, d);
            })}
          </g>
          <Axis
            scale = {this.props.transformObject.rescaleY(yScale)}
            axisFn = {axisLeft}
            transformString = {getLeftAxisTransform(config)}
          />
          <Axis
            scale = {this.props.transformObject.rescaleX(xScale)}
            axisFn = {axisBottom}
            transformString = {getBottomAxisTransform(config)}
          />
        </svg>
      </div>
    );
  }
}

export default ChartView;