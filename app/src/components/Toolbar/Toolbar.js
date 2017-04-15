import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { identity } from 'ramda';

import toolbarConfig from './toolbarConfig';
import {
  createDisplaySelector
} from './ToolbarSelectors';

function makeMapStateToProps() {
  const displaySelector = createDisplaySelector(toolbarConfig);
  return (state) => ({
    display: displaySelector(state)
  });
}

@connect(makeMapStateToProps, null)
class Toolbar extends Component {
  static propTypes = {
    state: PropTypes.object,
    display: PropTypes.node
  };

  render() {
    return (
      <div>
        {this.props.display}
      </div>
    );
  }
}

export default Toolbar;