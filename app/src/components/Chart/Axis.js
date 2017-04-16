import { Component, PropTypes } from 'react';
import { select } from 'd3-selection';

class Axis extends Component {
  static propTypes = {
    axisFn: PropTypes.func.isRequired,
    scale: PropTypes.func.isRequired,
    transformString: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.makeRef = this.makeRef.bind(this);
    this.refreshAxis = this.refreshAxis.bind(this);
  }

  makeRef(ref) {
    this.axis = ref;
  }

  refreshAxis() {
    select(this.axis).call(
      this.props.axisFn(this.props.scale)
        .ticks(10)
    );
  }

  componentDidUpdate() {
    this.refreshAxis();
  }

  render() {
    return (
      <g
        ref = {this.makeRef}
        transform = {this.props.transformString}
      />
    );
  }
}

export default Axis;