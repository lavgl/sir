import { Component, PropTypes } from 'react';

import { RemoveButton } from 'components/buttons/RemoveButton';

const style = {
  display: 'flex',
  justifyContent: 'center'
};

class RemoveButtonCell extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div style = {style}>
        <RemoveButton
          onClick = {this.props.onClick}
          id = {this.props.id}
        />
      </div>
    );
  }
}

export default RemoveButtonCell;