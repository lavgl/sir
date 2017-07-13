import { fromJS } from 'immutable';

import {
  IMAGE,
  STANDARD,
  LINE,
  FADED_STANDARD
} from 'constants/elementTypes';

const createMapItem = (type) => (item) => {
  return fromJS({
    type,
    props: item
  });
};

export const mapImageItem = createMapItem(IMAGE);

export const mapStandardItem = (item, groups) => {
  const group = groups.get(item.get('groupId'));
  return fromJS({
    type: STANDARD,
    props: item
      .set('group', group)
      .remove('groupId')
  });
};
export const mapLineItem = (item) => {
  const image = item.get('image');
  const standard = item.get('standard');
  return fromJS({
    type: LINE,
    props: {
      id: `${image.get('id')}.${standard.get('id')}`,
      x1: image.get('x'),
      y1: image.get('y'),
      x2: standard.get('x'),
      y2: standard.get('y')
    }
  });
};

export function handleCellUpdateFactory(cb) {
  return (event) => {
    if (event.action === 'CELL_UPDATE' && event.fromRow === event.toRow) {
      const { cellKey, updated } = event;
      const newValue = updated[cellKey];
      if (!isNaN(newValue) && isFinite(newValue)) {
        cb(event, newValue);
      }
    } else {
      console.log('Wrong event: ', event);
    }
  }
}

export function listFrom(map) {
  return map.toList().sortBy(d => d.get('id'));
}
