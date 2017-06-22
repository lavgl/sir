import { Component, PropTypes } from 'react';

class Standard extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.string
  };

  render() {
    return (
      <circle
        cx = {this.props.x}
        cy = {this.props.y}
        r = {10}
        fill = {this.props.color}
      />
    )
  }
}

export default Standard;
