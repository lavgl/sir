import { Component, PropTypes } from 'react';
import PureRender from 'pure-render-decorator';

import GridLine from './GridLine';

@PureRender
class Grid extends Component {
  static propTypes = {
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  };

  render() {
    const [ fromX, toX ] = this.props.xScale.range();
    const [ fromY, toY ] = this.props.yScale.range();

    return (
      <g>
        {this.props.xScale.ticks().map(tick => {
          const x = this.props.xScale(tick);

          return (
            <GridLine
              key = {x}
              x1 = {x}
              x2 = {x}
              y1 = {fromY}
              y2 = {toY}
            />
          );
        })}
        {this.props.yScale.ticks().map(tick => {
          const y = this.props.yScale(tick);

          return (
            <GridLine
              key = {y}
              x1 = {fromX}
              x2 = {toX}
              y1 = {y}
              y2 = {y}
            />
          );
        })}
      </g>
    );
  }
}

export default Grid;