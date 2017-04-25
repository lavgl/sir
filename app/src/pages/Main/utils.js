import Immutable from 'immutable';

import {
  IMAGE,
  STANDARD
} from 'constants/elementTypes';

import {
  toString,
  toNumber
} from 'utils';

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

export function handleCellUpdateFactory(cb) {
  return (event) => {
    if (event.action === 'CELL_UPDATE' && event.fromRow === event.toRow) {
      const { cellKey, updated } = event;
      const newValue = toNumber(updated[cellKey]);
      if (!isNaN(newValue) && isFinite(newValue)) {
        cb(event, newValue);
      }
    } else {
      console.log('Wrong event: ', event);
    }
  }
}