import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import elementResizeDetectorMaker from 'element-resize-detector';

import {
  initChart,
  setChartWidth
} from 'actions/UI';

import {
  getWidth
} from './ChartUtils';

import {
  getChartState
} from './ChartSelectors';

const erd = elementResizeDetectorMaker({
  strategy: 'scroll'
});

function mapStateToProps(state, props) {
  return {
    chart: getChartState(state, props)
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

    this.makeRef = this.makeRef.bind(this);
  }

  makeRef(ref) {
    this.chart = ref;
  }

  componentWillMount() {
    this.props.initChart({
      name: this.props.name
    });
  }

  componentDidMount() {
    erd.listenTo(this.chart, (element) => this.props.setChartWidth({
      name: this.props.name,
      width: getWidth(element)
    }));
  }

  render() {
    console.log(this.props.chart);
    return (
      <div ref = {this.makeRef}>
        <svg width = '100%' height = '100%'>
          <g>
            {/*{grid will be here}*/}
          </g>
          {this.props.data.map(datum => {

          })}
        </svg>
      </div>
    );
  }
}

export default Chart;