import { createSelector } from 'reselect';

import {
  mapImageItem,
  mapStandardItem
} from './utils';

const images = state => state.Images.get('images');
const standards = state => state.Standards.get('standards');
const groups = state => state.Groups.get('groups');

export const chartData = createSelector(
  images, standards, groups,
  (images, standards, groups) => {
    const imageItems = images.map(mapImageItem);
    const standardItems = standards.map(std => mapStandardItem(std, groups));

    return imageItems
      .toList()
      .concat(standardItems.toList());
  }
);