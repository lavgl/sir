import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD,
  LINE,
  FADED_STANDARD
} from 'constants/elementTypes';

import Image from 'components/Chart/elements/Image';
import Standard from 'components/Chart/elements/Standard';
import Line from 'components/Chart/elements/Line';

import {
  isStandardDefined,
  isImageDefined,
  getStandardDatumColor,
  getFadedStandardDatumColor
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
          color = {getStandardDatumColor(datum)}
        />
      ),
      isValid: isStandardDefined
    },
    [FADED_STANDARD]: {
      render: (datum, xScale, yScale) => (
        <Standard
          key = {`faded_standard_${datum.get('id')}`}
          x = {xScale(datum.get('x'))}
          y = {yScale(datum.get('y'))}
          color = {getFadedStandardDatumColor(datum)}
        />
      ),
      isValid: isStandardDefined
    },
    [LINE]: {
      render: (datum, xScale, yScale) => {
        return (
          <Line
            key = {`line_${datum.get('id')}`}
            x1 = {xScale(datum.get('x1'))}
            x2 = {xScale(datum.get('x2'))}
            y1 = {yScale(datum.get('y1'))}
            y2 = {yScale(datum.get('y2'))}
          />
        );
      }
      // isValid: () => false
    }
  }
});
