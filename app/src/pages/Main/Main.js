import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Chart from 'components/Chart';
import Footer from 'components/Footer';

import {
  chartData
} from './selectors';

import chartConfig from './chartConfig';

function mapStateToProps(state) {
  return {
    chartData: chartData(state)
  };
}

const style = {
  page: {
    position: 'relative'
  }
};

@connect(mapStateToProps, null)
class Main extends Component {
  static propTypes = {
    chartData: PropTypes.instanceOf(Immutable.List).isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style = {style.page}>
        <h1>Main Page</h1>
        <Chart
          name = "main"
          data = {this.props.chartData}
          config = {chartConfig}
        />
        <Footer>
          LOL
        </Footer>
      </div>
    );
  }
}

export default Main;