import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';

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
        <Grid fluid = {true}>
          <Row>
            <Col xs = {7} sm = {7} md = {7}>
              <Row>
                <Col>
                  <div style = {{ height: 100 }}>
                    Legend
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Chart
                    name = "main"
                    data = {this.props.chartData}
                    config = {chartConfig}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs = {5} sm = {5} md = {5}>
              <Row>
                <Col>
                  <div style = {{ height: 295 }}>
                    Standards table
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style = {{ height: 295 }}>
                    Images table
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style = {{ height: 30 }}>
                    Buttons panel
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        {/*<div>
          <Table
            columns = {columns}
            data = {this.props.standards.toList()}
            handleGridCellUpdate = {this.handleStandardTableCellUpdate}
            minWidth = {250}
          />
        </div>*/}
        <Footer>
          <Toolbar />
        </Footer>
      </div>
    );
  }
}

export default Main;