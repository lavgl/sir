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
    },
    y: {
      domain: [-10, 10]
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