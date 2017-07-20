import { fromJS } from 'immutable';
import { add, compose } from 'ramda';

import {
  IMAGE,
  STANDARD,
  LINE,
  FADED_STANDARD
} from 'constants/elementTypes';

import { prop, count } from 'utils/fp';

const createMapItem = (type) => (item) => {
  return fromJS({
    type,
    props: item
  });
};

export const mapImageItem = createMapItem(IMAGE);

const createMapStandardItem = type => (item, groups) => {
  const group = groups.get(item.get('groupId'));
  return fromJS({
    type,
    props: item
      .set('group', group)
      .remove('groupId')
  });
};

export const mapStandardItem = createMapStandardItem(STANDARD);
export const mapFadedStandardItem = createMapStandardItem(FADED_STANDARD);

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

const avg = (propName, cluster) => cluster.map(prop(propName)).reduce(add) / cluster.size;
const getGroupId = standardsCluster => standardsCluster.first().get('groupId');

function generateIdForAverageStandard(cluster) {
  const groupId = getGroupId(cluster);
  return `AVERAGE_CLUSTER_${groupId}`;
}

function findAverageStandardCoords(standardsCluster) {
  const avgX = avg('x', standardsCluster);
  const avgY = avg('y', standardsCluster);
  const groupId = getGroupId(standardsCluster);

  return fromJS({
    x: avgX,
    y: avgY,
    groupId,
    id: generateIdForAverageStandard(standardsCluster)
  });
}

function getCountByGroupId(standards) {
  return standards.groupBy(prop('groupId')).map(count());
}

export function defineStandardsTypes(standards) {
  const countByGroupId = getCountByGroupId(standards);

  return standards.map(standard => {
    const groupId = standard.get('groupId');
    const type = countByGroupId.get(groupId) > 1 ? FADED_STANDARD : STANDARD;

    return fromJS({ type, standard });
  });
}

const standardMappers = {
  [STANDARD]: mapStandardItem,
  [FADED_STANDARD]: mapFadedStandardItem
};

export function mapTypedStandardItem(groups) {
  return item => {
    const type = item.get('type');
    const standard = item.get('standard');

    const mapper = standardMappers[type];

    if (!mapper) {
      throw new Error(`You should provide mapper for ${type}`);
    }

    return mapper(standard, groups);
  };
}

// TODO: move function to upper level, as it is used in actions
export function getAverageStandards(standards) {
  return standards
    .groupBy(prop('groupId'))
    .filter(standards => standards.size > 1)
    .map(findAverageStandardCoords)
    .toList();
}

// TODO: the same, move to upper level
export function removeFadedStandards(standards) {
  return standards
    .groupBy(prop('groupId'))
    .filterNot(standards => standards.size > 1)
    .toList()
    .flatten(true);
}

export function populateAverageStandards(standards) {
  return getAverageStandards(standards)
    .map(standard =>
      fromJS({ type: STANDARD, standard }));
}
