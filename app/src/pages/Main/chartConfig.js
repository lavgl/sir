import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD
} from 'constants/elementTypes';

import Image from 'components/Chart/elements/Image';
import Standard from 'components/Chart/elements/Standard';

import {
  isStandardDefined,
  isImageDefined
} from 'utils';

import {
  DEFAULT_CHART_DOMAIN_X,
  DEFAULT_CHART_DOMAIN_Y,
  DEFAULT_CHART_WIDTH,
  DEFAULT_CHART_HEIGHT
} from 'constants/Chart';

export default Immutable.fromJS({
  height: DEFAULT_CHART_HEIGHT,
  width: DEFAULT_CHART_WIDTH,
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
      render: (datum, xScale, yScale) => (
        <Image
          key = {`image_${datum.get('id')}`}
          x = {xScale(datum.get('x'))}
          y = {yScale(datum.get('y'))}
        />
      ),
      isValid: isImageDefined
    },
    [STANDARD]: {
      render: (datum, xScale, yScale) => (
        <Standard
          key = {`standard_${datum.get('id')}`}
          x = {xScale(datum.get('x'))}
          y = {yScale(datum.get('y'))}
        />
      ),
      isValid: isStandardDefined
    }
  }
});