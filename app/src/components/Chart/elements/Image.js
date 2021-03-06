import { Component, PropTypes } from 'react';

class Image extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    return (
      <circle
        cx = {this.props.x}
        cy = {this.props.y}
        fill = 'blue'
        r = {5}
      />
    )
  }
}

export default Image;