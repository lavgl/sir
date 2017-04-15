import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import {
  initChart,
  setChartWidth,
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
  getChartStateFactory
} from './ChartSelectors';

function mapStateToProps(state, props) {
  return {
    chart: getChartStateFromRedux(state, props)
  }
}

const mapDispatchToProps = {
  initChart,
  setChartWidth,
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
    handleChartMouseMove: PropTypes.func.isRequired,
    handleMoveMouseOutOfChart: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.getChartState = getChartStateFactory();
    this.getXScale = getXScaleFactory(this.getChartState);
    this.getYScale = getYScaleFactory(this.getChartState);

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
      height: this.props.config.get('height')
    };

    const xScale = this.getXScale(this.props);
    const yScale = this.getYScale(this.props);

    return (
      <div style = {style}>
        <ChartView
          name = {this.props.name}
          data = {this.props.data}
          config = {this.props.config}
          xScale = {xScale}
          yScale = {yScale}
          setChartWidth = {this.props.setChartWidth}
          handleChartMouseMove = {this.props.handleChartMouseMove}
          handleMoveMouseOutOfChart = {this.props.handleMoveMouseOutOfChart}
        />
      </div>
    );
  }
}

export default Chart;