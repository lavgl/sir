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
          const config = this.props.config.getIn(['elements', datum.get('type')]);
          const renderFn = config.get('render');
          const isValidFn = config.get('isValid', () => true);
          const d = datum.get('props');
          if (isValidFn(d)) {
            return renderFn(d, this.props.xScale, this.props.yScale);
          } else {
            return null;
          }
        })}
      </g>
    );
  }
}

export default Layout;