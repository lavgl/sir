import { format } from 'd3-format';

import {
  NONE_MODE,
  CHART_MOUSE_POSITION_MODE
} from 'constants/Toolbar';

export default {
  [NONE_MODE]: () => '',
  [CHART_MOUSE_POSITION_MODE]: getChartMousePosition
}

const formatPosition = format('.2f');

function getChartMousePosition(state) {
  const toolbar = state.UI.get('toolbar');
  const params = toolbar.get('params');

  const position = state.UI.getIn(
    ['mouse', 'position']
  ).map(formatPosition);

  return `[${position.get('x')}; ${position.get('y')}]`;
}