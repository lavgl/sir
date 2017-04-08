import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD
} from 'constants/elementTypes';

const createMapItem = (type) => (item) => {
  return Immutable.fromJS({
    type,
    props: item
  });
};

export const mapImageItem = createMapItem(IMAGE);

export const mapStandardItem = (item, groups) => {
  const group = groups.get(''+item.get('groupId'));
  return Immutable.fromJS({
    type: STANDARD,
    props: item
      .set('group', group)
      .remove('groupId')
  });
};