import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';

const style = {
  stroke: 'black',
  strokeWidth: 0.25
};

@PureRender
class GridLine extends Component {
  static propTypes = {
    x1: PropTypes.number.isRequired,
    x2: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    y2: PropTypes.number.isRequired
  };

  render() {
    return (
      <line
        style = {style}
        x1 = {this.props.x1}
        x2 = {this.props.x2}
        y1 = {this.props.y1}
        y2 = {this.props.y2}
      />
    );
  }
}

export default GridLine;