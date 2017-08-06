import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { path, compose } from 'ramda';

import { Grid, Row, Col, Checkbox, Button, FormControl } from 'react-bootstrap';

import Chart from 'components/Chart';
import Table from 'components/Table';
import Footer from 'components/Footer';
import Toolbar from 'components/Toolbar';
import Legend from 'components/Legend';
import Navbar from 'components/Navbar';
import { ChartToolbarWithButtons } from 'components/ChartToolbar';

import { RemoveButtonCell } from 'components/Table/cells';

import {
  chartData,
  isSubmitButtonDisabled,
  isResultCalculated,
  sortedDataForImagesTable,
  calculationAlgorithm
} from './selectors';

import chartConfig from './chartConfig';

import {
  PLAIN_DISTANCE_ALGORITHM,
  DECISIVE_FUNCTION_ALGORITHM,
  SEPARATING_FUNCTION_ALGORITHM
} from 'constants/UI';

import {
  addStandard,
  updateStandardAndGroup,
  removeStandardAndMaybeGroup
} from 'actions/Standards';

import {
  addImage,
  updateImage,
  removeImage
} from 'actions/Images';

import {
  calculateResultsAction as calculateResults,
  resetResult,
  fullReset
} from 'actions/Result';

import {
  toggleAverageStandards,
  selectCalculationAlgorithm
} from 'actions/UI';

import {
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
    images: state.Images.get('images'),
    isSubmitButtonDisabled: isSubmitButtonDisabled(state),
    shouldAverageStandards: state.UI.get('shouldAverageStandards'),
    isResultCalculated: isResultCalculated(state),
    dataForImagesTable: sortedDataForImagesTable(state),
    calculationAlgorithm: calculationAlgorithm(state)
  };
}

const mapDispatchToProps = {
  addStandard,
  updateStandardAndGroup,
  addImage,
  updateImage,
  removeImage,
  calculateResults,
  resetResult,
  fullReset,
  removeStandardAndMaybeGroup,
  toggleAverageStandards,
  selectCalculationAlgorithm: compose(selectCalculationAlgorithm, path(['target', 'value']))
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
    images: PropTypes.instanceOf(Immutable.Map).isRequired,

    calculateResults: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleStandardTableCellUpdate = handleCellUpdateFactory(this.handleCellUpdateForStandard.bind(this));
    this.handleImageTableCellUpdate = handleCellUpdateFactory(this.handleCellUpdateForImage.bind(this));
    this.handleChangeAlgorithm = this.handleChangeAlgorithm.bind(this);
    this.getStandardTableColumns = this.getStandardTableColumns.bind(this);
    this.getImageTableColumns = this.getImageTableColumns.bind(this);
    this.addStandard = this.addStandard.bind(this);
    this.addImage = this.addImage.bind(this);
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
            const rowId = eventArgs.rowIdx;
            const datum = listFrom(this.props.standards).get(rowId);
            this.props.removeStandardAndMaybeGroup({
              id: datum.get('id')
            });
            this.props.resetResult();
          }
        }
      }
    };
  }

  getImageTableColumns() {
    return Object.assign({},
      {
        id: { key: 'id', name: '№' },
        x: { key: 'x', name: 'x', editable: true },
        y: { key: 'y', name: 'y', editable: true }
      },
      this.props.isResultCalculated ? {
        groupId: { key: 'groupId', name: 'Группа'  },
        distance: { key: 'distance', name: 'Расстояние' },
      } : null,
      {
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
              this.props.resetResult();
            }
          }
        }
      });
  }

  handleCellUpdateForStandard(event, newValue) {
    const { fromRow, cellKey } = event;
    const datum = listFrom(this.props.standards).get(fromRow);
    const newDatum = datum.set(cellKey, newValue);
    this.props.updateStandardAndGroup({
      standard: newDatum
    });
    this.props.resetResult();
  }

  handleCellUpdateForImage(event, newValue) {
    const { fromRow, cellKey } = event;
    const datum = listFrom(this.props.images).get(fromRow);
    const newDatum = datum.set(cellKey, newValue);
    this.props.updateImage({
      image: newDatum
    });
    this.props.resetResult();
  }

  handleChangeAlgorithm(e) {
    this.props.selectCalculationAlgorithm(e);
    this.props.resetResult();
  }

  addStandard() {
    this.props.resetResult();
    this.props.addStandard();
  }

  addImage() {
    this.props.resetResult();
    this.props.addImage();
  }

  render() {
    const standards = this.props.standards.toList().sortBy(v => v.get('id'));
    const images = this.props.images.toList().sortBy(v => v.get('id'));
    return (
      <div style = {style.page}>
        <Navbar />
        <Grid fluid = {true}>
          <Row>
            <Col xs = {7} sm = {7} md = {7}>
              <Row>
                <Col>
                  <Legend />
                </Col>
              </Row>
              <Row style = {{ marginTop: -10, position: 'relative' }}>
                <Col>
                  <div style = {{ position: 'absolute', right: 27, top: 24 }}>
                    <ChartToolbarWithButtons />
                  </div>
                  <Chart
                    name = "main"
                    data = {this.props.chartData}
                    config = {chartConfig}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs = {5} sm = {5} md = {5} style = {{ marginTop: 5 }}>
              <Row>
                <Col>
                  <Table
                    columns = {this.getStandardTableColumns()}
                    data = {standards}
                    handleGridCellUpdate = {this.handleStandardTableCellUpdate}
                    minWidth = {360}
                    minHeight = {200}
                  />
                </Col>
              </Row>
              <Row>
                <Col style = {{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button
                    bsStyle = 'default'
                    onClick = {this.addStandard}
                    style = {{ padding: '0px 6px' }}
                  >
                    +
                  </Button>
                  <Checkbox
                    style = {{ marginLeft: 10 }}
                    onChange = {this.props.toggleAverageStandards}
                    checked = {this.props.shouldAverageStandards}
                  >
                    Усреднять эталоны
                  </Checkbox>
                </Col>
              </Row>
              <Row style = {{ marginBottom: 10, marginRight: -8 }}>
                <Col>
                  <FormControl
                    componentClass = 'select'
                    onChange = {this.handleChangeAlgorithm}
                    value = {this.props.calculationAlgorithm}
                  >
                    <option value = {PLAIN_DISTANCE_ALGORITHM}>Алгоритм 1</option>
                    <option value = {DECISIVE_FUNCTION_ALGORITHM}>Алгоритм 2</option>
                    <option value = {SEPARATING_FUNCTION_ALGORITHM}>Алгоритм 3</option>
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    columns = {this.getImageTableColumns()}
                    data = {this.props.dataForImagesTable}
                    handleGridCellUpdate = {this.handleImageTableCellUpdate}
                    minWidth = {360}
                    minHeight = {254}
                  />
                </Col>
              </Row>
              <Row>
                <Col style = {{ marginTop: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Button
                    bsStyle = 'default'
                    onClick = {this.addImage}
                    style = {{ padding: '0px 6px', marginRight: 10 }}
                  >
                    +
                  </Button>
                  <Button
                    bsStyle = 'success'
                    style = {{ width: 217, marginRight: 10 }}
                    onClick = {this.props.calculateResults}
                    disabled = {this.props.isSubmitButtonDisabled}
                  >
                    Рассчитать
                  </Button>
                  <Button
                    bsStyle = 'danger'
                    style = {{ width: 100 }}
                    onClick = {this.props.fullReset}
                  >
                    Очистить
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <Footer>
          <Toolbar />
        </Footer>
      </div>
    );
  }
}

export default Main;
