import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import PureRender from 'pure-render-decorator';

@PureRender
class Layout extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired
  };

  render() {
    return (
      <g>
        {this.props.data.map(datum => {
          const renderFn = this.props.config.getIn(['elements', datum.get('type'), 'render']);
          const d = datum.get('props');
          const x = this.props.xScale(d.get('x'));
          const y = this.props.yScale(d.get('y'));
          return renderFn({ x, y }, d);
        })}
      </g>
    );
  }
}

export default Layout;