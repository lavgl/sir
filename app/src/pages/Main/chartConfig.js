import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD
} from 'constants/elementTypes';

import Image from 'components/Chart/elements/Image';
import Standard from 'components/Chart/elements/Standard';

export default Immutable.fromJS({
  height: 500,
  axes: {
    x: {
      domain: [-10, 10]
    }
  },
  elements: {
    [IMAGE]: {
      render: (datum) => (
        <Image
          x = {datum.get('x')}
          y = {datum.get('y')}
        />
      ),
    },
    [STANDARD]: {
      render: (datum) => (
        <Standard
          x = {datum.get('x')}
          y = {datum.get('y')}
        />
      )
    }
  }
});