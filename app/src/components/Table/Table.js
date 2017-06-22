import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { values } from 'ramda';

import ReactDataGrid from 'react-data-grid';
import listenToClickOutside from 'react-onclickoutside';

import {
  getDataFactory,
  getRowsCountFactory
} from './TableSelectors';

@listenToClickOutside
class Table extends Component {
  static propTypes = {
    columns: PropTypes.object.isRequired,
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    handleGridCellUpdate: PropTypes.func,
    minHeight: PropTypes.number
  };

  static defaultProps = {
    minHeight: 250
  };

  constructor(props) {
    super(props);

    this.getData = getDataFactory();
    this.getRowsCount = getRowsCountFactory(this.getData);

    this.rowGetter = this.rowGetter.bind(this);
    this.handleGridCellUpdate = this.handleGridCellUpdate.bind(this);
  }

  rowGetter(i) {
    return this.props.data.get(i);
  }

  handleGridCellUpdate(obj) {
    this.props.handleGridCellUpdate && this.props.handleGridCellUpdate(obj);
  }

  handleClickOutside() {
    this.grid.deselectCells();
  }

  render() {
    const rowsCount = this.getRowsCount(this.props);

    const {
      columns,
      minHeight,
      ...rest
    } = this.props;

    return (
      <ReactDataGrid
        ref = {ref => this.grid = ref}
        columns = {values(columns)}
        minHeight = {minHeight}
        rowGetter = {this.rowGetter}
        rowsCount = {rowsCount}
        onGridRowsUpdated = {this.handleGridCellUpdate}
        enableCellSelect = {true}
        cellNavigationMode = 'changeRow'
        {...rest}
      />
    );
  }
}

export default Table;
