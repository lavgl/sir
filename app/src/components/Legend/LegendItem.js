import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

function mapStateToProps(state, { groupId }) {
  return {
    group: state.Groups.getIn(['groups', groupId])
  };
}

@connect(mapStateToProps)
class LegendItem extends Component {
  static propTypes = {
    group: PropTypes.instanceOf(Map).isRequired,
    height: PropTypes.number.isRequired
  };

  render() {
    const { group, height } = this.props;

    const wrapperStyle = getWrapperStyle(this.props);
    const rectStyle = getReactStyle(this.props);

    return (
      <div style = {wrapperStyle}>
        <div style = {rectStyle} />
        <div>Группа {group.get('id')}</div>
      </div>
    );
  };
}

export default LegendItem;

function getReactStyle({ group, height }) {
  const x = height * 0.75;
  return {
    height: x,
    width: x,
    marginRight: 5,
    backgroundColor: group.get('color')
  };
}

function getWrapperStyle({ height }) {
  return {
    display: 'flex',
    alignItems: 'center',
    height
  };
}
