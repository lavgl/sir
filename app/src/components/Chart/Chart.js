import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
// import elementResizeDetectorMaker from 'element-resize-detector';

import {
  initChart,
  setChartWidth
} from 'actions/UI';

import ChartView from './ChartView';

import {
  getWidth,
  isReady
} from './ChartUtils';

import {
  getChartStateFromRedux,
  getXScaleFactory,
  getYScaleFactory,
  getChartStateFactory
} from './ChartSelectors';

// const erd = elementResizeDetectorMaker({
//   strategy: 'scroll'
// });

function mapStateToProps(state, props) {
  return {
    chart: getChartStateFromRedux(state, props)
  }
}

const mapDispatchToProps = {
  initChart,
  setChartWidth
};

@connect(mapStateToProps, mapDispatchToProps)
class Chart extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired,
    chart: PropTypes.instanceOf(Immutable.Map)
  };

  constructor(props) {
    super(props);

    // this.makeRef = this.makeRef.bind(this);

    this.getChartState = getChartStateFactory();
    this.getXScale = getXScaleFactory(this.getChartState);
    this.getYScale = getYScaleFactory(this.getChartState);

    props.initChart({
      name: props.name,
      config: props.config
    });
  }

  // makeRef(ref) {
  //   this.chart = ref;
  // }

  // componentWillMount() {
  //   this.props.initChart({
  //     name: this.props.name,
  //     config: this.props.config
  //   });
  // }

  // componentDidMount() {
  //   erd.listenTo(this.chart, (element) => this.props.setChartWidth({
  //     name: this.props.name,
  //     width: getWidth(element)
  //   }));
  // }

  render() {
    console.log('state', this.props.chart);

    if (!isReady(this.props)) {
      return <div>Loading...</div>
    }

    const style = {
      height: this.props.config.get('height')
    };

    const xScale = this.getXScale(this.props);
    const yScale = this.getYScale(this.props);

    return (
      <div ref = {this.makeRef} style = {style}>
        <ChartView
          name = {this.props.name}
          data = {this.props.data}
          config = {this.props.config}
          xScale = {xScale}
          yScale = {yScale}
          setChartWidth = {this.props.setChartWidth}
        />
      </div>
    );
  }
}

export default Chart;