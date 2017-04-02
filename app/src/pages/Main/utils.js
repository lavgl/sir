import Immutable from 'immutable';

const createMapItem = (type) => (item) => {
  return Immutable.fromJS({
    type,
    props: item
  });
};

export const mapImageItem = createMapItem('image');

export const mapStandardItem = (item, groups) => {
  const group = groups.get(''+item.get('groupId'));
  return Immutable.fromJS({
    type: 'standard',
    props: item
      .set('group', group)
      .remove('groupId')
  });
};