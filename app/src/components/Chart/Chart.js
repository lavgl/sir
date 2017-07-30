import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import {
  initChart,
  setChartWidth,
  setChartZoom,
  handleChartMouseMove,
  handleMoveMouseOutOfChart
} from 'actions/UI';

import ChartView from './ChartView';

import {
  isReady
} from './ChartUtils';

import {
  getChartStateFromRedux,
  getXScaleFactory,
  getYScaleFactory,
  getChartStateFactory,
  getZoomTransformFactory,
  getTransformObjectFactory,
  getConfigFactory
} from './ChartSelectors';

function mapStateToProps(state, props) {
  return {
    chart: getChartStateFromRedux(state, props)
  }
}

const mapDispatchToProps = {
  initChart,
  setChartWidth,
  setChartZoom,
  handleChartMouseMove,
  handleMoveMouseOutOfChart
};

@connect(mapStateToProps, mapDispatchToProps)
class Chart extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired,
    chart: PropTypes.instanceOf(Immutable.Map),

    initChart: PropTypes.func.isRequired,
    setChartWidth: PropTypes.func.isRequired,
    setChartZoom: PropTypes.func.isRequired,
    handleChartMouseMove: PropTypes.func.isRequired,
    handleMoveMouseOutOfChart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.getChartState = getChartStateFactory();
    this.getConfig = getConfigFactory();

    this.getXScale = getXScaleFactory(this.getChartState);
    this.getYScale = getYScaleFactory(this.getChartState);
    this.getZoomTransform = getZoomTransformFactory(this.getChartState);

    this.getTransformObject = getTransformObjectFactory(this.getZoomTransform)

    props.initChart({
      name: props.name,
      config: props.config
    });
  }

  render() {
    if (!isReady(this.props)) {
      return <div>Loading...</div>
    }

    const style = {
      height: this.props.config.get('height'),
      width: this.props.config.get('width')
    };

    const xScale = this.getXScale(this.props);
    const yScale = this.getYScale(this.props);
    const transformObject = this.getTransformObject(this.props);

    return (
      <div style = {style}>
        <ChartView
          name = {this.props.name}
          data = {this.props.data}
          chart = {this.props.chart}
          config = {this.props.config}
          xScale = {xScale}
          yScale = {yScale}
          transformObject = {transformObject}
          setChartWidth = {this.props.setChartWidth}
          setChartZoom = {this.props.setChartZoom}
          handleChartMouseMove = {this.props.handleChartMouseMove}
          handleMoveMouseOutOfChart = {this.props.handleMoveMouseOutOfChart}
        />
      </div>
    );
  }
}

export default Chart;
