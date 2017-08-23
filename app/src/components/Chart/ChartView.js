import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';
import elementResizeDetectorMaker from 'element-resize-detector';
import { axisLeft, axisBottom } from 'd3-axis';
import { event, select } from 'd3-selection';

import {
  ADD_STANDARD_MODE,
  ADD_IMAGE_MODE
} from 'constants/Chart';

import { addImage } from 'actions/Images';
import { addStandard } from 'actions/Standards';
import { resetResult } from 'actions/Result';

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
  getInnerSvgProps,
  getLayoutXScale,
  getLayoutYScale
} from './ChartUtils';

const erd = elementResizeDetectorMaker({
  strategy: 'scroll'
});

import { getSelectedToolbarModeFactory } from './ChartSelectors';

function mapStateToProps(state, props) {
  return {
    toolbarMode: state.UI.getIn(['charts', props.name, 'toolbarMode'])
  };
}

const mapDispatchToProps = {
  addImage,
  addStandard,
  resetResult
};

@connect(mapStateToProps, mapDispatchToProps)
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
    transformObject: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.makeRef = this.makeRef.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
    this.zoomListener = this.zoomListener.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    const { xScale, yScale, transformObject } = this.props;

    const transformedXScale = transformObject.rescaleX(xScale);
    const transformedYScale = transformObject.rescaleY(yScale);

    const position = getMousePosition(
      this.props.config,
      transformedXScale,
      transformedYScale,
      e.nativeEvent
    );

    if (isPositionInsideChart(position, transformedXScale, transformedYScale)) {
      switch (this.props.toolbarMode) {
        case ADD_STANDARD_MODE: {
          this.props.resetResult();
          this.props.addStandard(position);
          break;
        }
        case ADD_IMAGE_MODE: {
          this.props.resetResult();
          this.props.addImage(position);
          break;
        }
      }
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
    const { xScale, yScale, config, transformObject } = this.props;
    const rescaledX = transformObject.rescaleX(xScale);
    const rescaledY = transformObject.rescaleY(yScale);

    const transformedLayoutXScale = transformObject.rescaleX(getLayoutXScale(this.props));
    const transformedLayoutYScale = transformObject.rescaleY(getLayoutYScale(this.props));

    return (
      <div
        ref = {this.makeRef}
        style={{ height: '100%' }}
        onMouseMove = {this.handleMouseMove}
        onMouseLeave = {this.props.handleMoveMouseOutOfChart}
        onClick = {this.handleClick}
      >
        <svg width = '100%' height = '100%'>
          <g transform = {getLeftAxisTransform(config)}>
            <Grid
              xScale = {rescaledX}
              yScale = {rescaledY}
            />
          </g>
          <svg {...getInnerSvgProps(config)}>
            <Layout
              data = {this.props.data}
              config = {this.props.config}
              xScale = {transformedLayoutXScale}
              yScale = {transformedLayoutYScale}
            />
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
