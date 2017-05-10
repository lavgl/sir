import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import { Grid, Row, Col, Checkbox } from 'react-bootstrap';

import Chart from 'components/Chart';
import Table from 'components/Table';
import Footer from 'components/Footer';
import Toolbar from 'components/Toolbar';

import { RemoveButtonCell } from 'components/Table/cells';

import {
  chartData
} from './selectors';

import chartConfig from './chartConfig';

import {
  addStandard,
  updateStandard,
  removeStandard
} from 'actions/Standards';

import {
  addImage,
  updateImage,
  removeImage
} from 'actions/Images';

import {
  toString,
  toNumber,
  isAllStandardsDefined,
  isAllImagesDefined
} from 'utils';

import {
  handleCellUpdateFactory,
  listFrom
} from './utils';

function mapStateToProps(state) {
  return {
    chartData: chartData(state),
    standards: state.Standards.get('standards'),
    images: state.Images.get('images')
  };
}

const mapDispatchToProps = {
  addStandard,
  updateStandard,
  removeStandard,
  addImage,
  updateImage,
  removeImage
};

const style = {
  page: {
    position: 'relative'
  }
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

    this.handleStandardTableCellUpdate = handleCellUpdateFactory(this.forStandard.bind(this));
    this.handleImageTableCellUpdate = handleCellUpdateFactory(this.forImage.bind(this));
    this.getStandardTableColumns = this.getStandardTableColumns.bind(this);
    this.getImageTableColumns = this.getImageTableColumns.bind(this);
  }

  getStandardTableColumns() {
    return {
      id: { key: 'id', name: '№' },
      x: { key: 'x', name: 'x', editable: true },
      y: { key: 'y', name: 'y', editable: true },
      groupId: { key: 'groupId', name: 'Группа', editable: true },
      remove: {
        key: 'remove',
        name: 'Удалить',
        editable: false,
        formatter: RemoveButtonCell,
        width: 70,
        events: {
          onClick: (ev, eventArgs) => {
            const rowId = toString(eventArgs.rowIdx);
            const datum = listFrom(this.props.standards).get(rowId);
            this.props.removeStandard({
              id: toString(datum.get('id'))
            });
          }
        }
      }
    };
  }

  getImageTableColumns() {
    return {
      id: { key: 'id', name: '№' },
      x: { key: 'x', name: 'x', editable: true },
      y: { key: 'y', name: 'y', editable: true },
      remove: {
        key: 'remove',
        name: 'Удалить',
        editable: false,
        formatter: RemoveButtonCell,
        width: 70,
        events: {
          onClick: (e, args) => {
            const rowId = args.rowIdx;
            const datum = listFrom(this.props.images).get(rowId);
            this.props.removeImage({
              id: datum.get('id')
            });
          }
        }
      }
      // TODO: add result columns
    };
  }

  forStandard(event, newValue) {
    const { fromRow, cellKey } = event;
    const datum = listFrom(this.props.standards).get(fromRow);
    const newDatum = datum.set(cellKey, newValue);
    this.props.updateStandard({
      standard: newDatum
    });
  }

  forImage(event, newValue) {
    const { fromRow, cellKey } = event;
    const datum = listFrom(this.props.images).get(fromRow);
    const newDatum = datum.set(cellKey, newValue);
    this.props.updateImage({
      image: newDatum
    });
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
                      columns = {this.getStandardTableColumns()}
                      data = {standards}
                      handleGridCellUpdate = {this.handleStandardTableCellUpdate}
                      minWidth = {360}
                      minHeight = {200}
                    />
                    <div className = 'btn btn-default'
                         onClick = {this.props.addStandard}
                         style = {{
                           padding: '0px 6px',
                           position: 'relative',
                           left: -1
                         }}>+</div>
                    <div style = {{
                      position: 'relative',
                      top: -30,
                      left: 35
                    }}>
                      <Checkbox onChange = {this.handleOnChangeAverageStandards}>
                        Усреднять эталоны
                      </Checkbox>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div style = {{ height: 340 }}>
                    <Table
                      columns = {this.getImageTableColumns()}
                      data = {images}
                      handleGridCellUpdate = {this.handleImageTableCellUpdate}
                      minWidth = {360}
                      minHeight = {340}
                    />
                    <div className = 'btn btn-default'
                         onClick = {this.props.addImage}
                         style={{
                           position: 'relative',
                           padding: '0 6px',
                           left: -1
                         }}>+</div>
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