import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD
} from 'constants/elementTypes';

import Image from 'components/Chart/elements/Image';
import Standard from 'components/Chart/elements/Standard';

import {
  DEFAULT_CHART_DOMAIN_X,
  DEFAULT_CHART_DOMAIN_Y
} from 'constants/Chart';

export default Immutable.fromJS({
  height: 500,
  margins: {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25
  },
  axes: {
    x: {
      domain: DEFAULT_CHART_DOMAIN_X
    },
    y: {
      domain: DEFAULT_CHART_DOMAIN_Y
    }
  },
  elements: {
    [IMAGE]: {
      render: ({ x, y }, datum) => (
        <Image
          key = {`image_${datum.get('id')}`}
          x = {x}
          y = {y}
        />
      ),
    },
    [STANDARD]: {
      render: ({ x, y }, datum) => (
        <Standard
          key = {`standard_${datum.get('id')}`}
          x = {x}
          y = {y}
        />
      )
    }
  }
});