import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Chart from 'components/Chart';
import Table from 'components/Table';
import Footer from 'components/Footer';
import Toolbar from 'components/Toolbar';

import {
  chartData
} from './selectors';

import chartConfig from './chartConfig';

function mapStateToProps(state) {
  return {
    chartData: chartData(state),
    standards: state.Standards.get('standards')
  };
}

const style = {
  page: {
    position: 'relative'
  }
};

const columns = {
  id: { key: 'id', name: '№' },
  x: { key: 'x', name: 'x', editable: true },
  y: { key: 'y', name: 'y', editable: true },
  groupId: { key: 'groupId', name: 'Группа', editable: true }
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
    console.log('standards', this.props.standards);
    return (
      <div style = {style.page}>
        <h1>Main Page</h1>
        {/*<Chart
          name = "main"
          data = {this.props.chartData}
          config = {chartConfig}
        />*/}
        <div style = {{ width: 400 }}>
          <Table
            columns = {columns}
            data = {this.props.standards.toList()}
            handleGridCellUpdate = {obj => console.log(obj)}
          />
        </div>
        <Footer>
          <Toolbar />
        </Footer>
      </div>
    );
  }
}

export default Main;