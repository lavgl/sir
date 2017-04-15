import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import elementResizeDetectorMaker from 'element-resize-detector';
import { axisLeft, axisBottom } from 'd3-axis';

import Axis from './Axis';

import {
  getWidth,
  getBottomAxisTransform,
  getLeftAxisTransform,
  getElementsTransform,
  getMousePosition
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
    setMousePosition: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.makeRef = this.makeRef.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
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

  handleMouseMove(e) {
    const position = getMousePosition(
      this.props.config,
      this.props.xScale,
      this.props.yScale,
      e.nativeEvent
    );
    this.props.setMousePosition({
      name: this.props.name,
      position
    });
  }

  componentDidMount() {
    erd.listenTo(this.chart, this.resizeListener);
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
      >
        <svg width = '100%' height = '100%'>
          <g>
            {/*{grid will be here}*/}
          </g>
          <g transform = {getElementsTransform(config)}>
            {this.props.data.map(datum => {
              const renderFn = config.getIn(['elements', datum.get('type'), 'render']);
              const d = datum.get('props');
              const x = xScale(d.get('x'));
              const y = yScale(d.get('y'));
              return renderFn({ x, y }, d);
            })}
          </g>
          <Axis
            scale = {yScale}
            axisFn = {axisLeft}
            transform = {getLeftAxisTransform(config)}
          />
          <Axis
            scale = {xScale}
            axisFn = {axisBottom}
            transform = {getBottomAxisTransform(config)}
          />
        </svg>
      </div>
    );
  }
}

export default ChartView;