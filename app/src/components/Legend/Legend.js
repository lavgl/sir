import { PureComponent } from 'react';
import { connect } from 'react-redux';

import LegendItem from './LegendItem';

function mapStateToProps(state) {
  return {
    groups: state.Groups.get('groups')
  };
}

const LEGEND_ITEM_HEIGHT = 20;

@connect(mapStateToProps)
class Legend extends PureComponent {
  static propTypes = {};

  static defaultProps = {
    width: 500,
    height: 90
  };

  render() {
    const { groups } = this.props;

    return (
      <div style = {getStyle(this.props)}>
        {this.props.groups.map(group =>
          <LegendItem
            key = {group.get('id')}
            groupId = {group.get('id')}
            height = {LEGEND_ITEM_HEIGHT}
          />
        ).toArray()}
      </div>
    )
  }
}

export default Legend;

function getStyle({ height, width, groups }) {
  const perColumn = Math.floor(height / LEGEND_ITEM_HEIGHT);
  const columnCount = Math.ceil(groups.size / perColumn);
  const columnWidth = Math.ceil(width / columnCount);

  return {
    height,
    width,
    columnCount,
    columnFill: 'auto',
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    paddingTop: 10,
    paddingLeft: 20
  };
}
