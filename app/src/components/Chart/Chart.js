import { Component, PropTypes } from 'react';
import Immutable from 'immutable';

class Chart extends Component {
  static propTypes = {
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired
  };

  render() {
    const { data, config } = this.props;
    const { width, height, elements } = config;
    return (
      <svg>
        <g>
          {/*{grid will be here}*/}
        </g>
        {this.props.data.map(datum => {

        })}
      </svg>
    );
  }
}

export default Chart;