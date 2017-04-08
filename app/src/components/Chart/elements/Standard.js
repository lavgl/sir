import { Component, PropTypes } from 'react';

class Standard extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    return (
      <circle
        cx = {this.props.x}
        cy = {this.props.y}
        r = {5}
        fill = 'red'
      />
    )
  }
}

export default Standard;