import { Component, PropTypes } from 'react';

class Line extends Component {
  static propTypes = {
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired
  };

  render() {
    return (
      <line
        x1 = {this.props.x1}
        x2 = {this.props.x2}
        y1 = {this.props.y1}
        y2 = {this.props.y2}
        style= {{
          stroke: 'black',
          strokeWidth: 2,
          strokeDasharray: '5,5'
        }}
      />
    )
  }
}

export default Line;