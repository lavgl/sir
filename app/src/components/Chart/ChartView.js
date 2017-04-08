import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import elementResizeDetectorMaker from 'element-resize-detector';

import {
  getWidth
} from './ChartUtils';

const erd = elementResizeDetectorMaker({
  strategy: 'scroll'
});

class ChartView extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.instanceOf(Immutable.List).isRequired,
    config: PropTypes.instanceOf(Immutable.Map).isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    setChartWidth: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.makeRef = this.makeRef.bind(this);
    this.resizeListener = this.resizeListener.bind(this);
  }

  makeRef(ref) {
    this.chart = ref;
  }

  resizeListener(element) {
    this.props.setChartWidth({
      name: this.props.name,
      width: getWidth(element)
    });
  }

  componentDidMount() {
    erd.listenTo(this.chart, this.resizeListener);
  }

  componentWillUnmount() {
    erd.removeListener(this.chart, this.resizeListener);
  }

  render() {
    const { xScale, yScale } = this.props;
    return (
      <div ref = {this.makeRef} style={{ height: '100%' }}>
        <svg width = '100%' height = '100%'>
          <g>
            {/*{grid will be here}*/}
          </g>
          {this.props.data.map(datum => {
            {/*console.log('config', this.props.config);*/}
            {/*console.log('type', datum.get('type'));*/}
            const renderFn = this.props.config.getIn(['elements', datum.get('type'), 'render']);
            const d = datum.get('props');
            const x = xScale(d.get('x'));
            const y = yScale(d.get('y'));
            {/*console.log('x scale', this.props.xScale.domain(), this.props.xScale.range());*/}
            {/*console.log('datum x', datum, datum.get('x'));*/}
            {/*console.log('x', x);*/}
            {/*console.log('y', y);*/}
            return renderFn({ x, y }, d);
          })}
        </svg>
      </div>
    );
  }
}

export default ChartView;