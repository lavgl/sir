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

import {
  addStandard,
  updateStandard
} from 'actions/Standards';

import {
  toString,
  toNumber
} from 'utils';

function mapStateToProps(state) {
  return {
    chartData: chartData(state),
    standards: state.Standards.get('standards')
  };
}

const mapDispatchToProps = {
  addStandard,
  updateStandard
};

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

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  static propTypes = {
    chartData: PropTypes.instanceOf(Immutable.List).isRequired,
    addStandard: PropTypes.func.isRequired,
    updateStandard: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleStandardTableCellUpdate = this.handleStandardTableCellUpdate.bind(this);
  }

  handleStandardTableCellUpdate(event) {
    if (event.action === 'CELL_UPDATE' && event.fromRow === event.toRow) {
      const { cellKey, fromRow, updated } = event;
      const newValue = toNumber(updated[cellKey]);
      if (!isNaN(newValue) && isFinite(newValue)) {
        const datum = this.props.standards.get(toString(fromRow));
        const newDatum = datum.set(cellKey, newValue);
        this.props.updateStandard({
          standard: newDatum
        });
      }
    } else {
      console.log('Wrong event: ', event);
    }
  }

  render() {
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
            handleGridCellUpdate = {this.handleStandardTableCellUpdate}
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