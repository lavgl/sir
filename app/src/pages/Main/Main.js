import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

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
  toNumber,
  isAllStandardsDefined
} from 'utils';

function mapStateToProps(state) {
  return {
    chartData: chartData(state),
    standards: state.Standards.get('standards'),
    images: state.Images.get('images')
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

const standardColumns = {
  id: { key: 'id', name: '№' },
  x: { key: 'x', name: 'x', editable: true },
  y: { key: 'y', name: 'y', editable: true },
  groupId: { key: 'groupId', name: 'Группа', editable: true }
};

const imageColumns = {
  id: { key: 'id', name: '№' },
  x: { key: 'x', name: 'x', editable: true },
  y: { key: 'y', name: 'y', editable: true }
  // TODO: add result columns
};

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  static propTypes = {
    chartData: PropTypes.instanceOf(Immutable.List).isRequired,
    standards: PropTypes.instanceOf(Immutable.Map).isRequired,
    addStandard: PropTypes.func.isRequired,
    updateStandard: PropTypes.func.isRequired,
    images: PropTypes.instanceOf(Immutable.Map).isRequired
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

  handleImageTableCellUpdate(event) {
    console.log('update image', event);
  }

  componentWillReceiveProps(nextProps) {
    if (isAllStandardsDefined(nextProps.standards)) {
      this.props.addStandard({});
    }
  }

  componentDidMount() {
    if (isAllStandardsDefined(this.props.standards)) {
      this.props.addStandard({});
    }
  }

  handleOnChangeAverageStandards(e) {
    console.log('e', e.target.checked);
  }

  render() {
    const standards = this.props.standards.toList().sortBy(v => toNumber(v.get('id')));
    const images = this.props.images.toList().sortBy(v => toNumber(v.get('id')));
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
                  <div style = {{ height: 230 }}>
                    <Table
                      columns = {standardColumns}
                      data = {standards}
                      handleGridCellUpdate = {this.handleStandardTableCellUpdate}
                      minWidth = {360}
                      minHeight = {200}
                    />
                    <Checkbox
                      onChange = {this.handleOnChangeAverageStandards}
                    >
                      Усреднять эталоны
                    </Checkbox>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style = {{ height: 340 }}>
                    <Table
                      columns = {imageColumns}
                      data = {images}
                      handleGridCellUpdate = {this.handleImageTableCellUpdate}
                      minWidth = {360}
                      minHeight = {340}
                    />
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

        </div>*/}
        <Footer>
          <Toolbar />
        </Footer>
      </div>
    );
  }
}

export default Main;