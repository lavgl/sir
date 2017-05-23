import { createSelector } from 'reselect';

import {
  mapImageItem,
  mapStandardItem,
  mapLineItem
} from './utils';

const images = state => state.Images.get('images');
const standards = state => state.Standards.get('standards');
const groups = state => state.Groups.get('groups');
const results = state => state.Result.get('results');

const lines = createSelector(
  results, (results) => results.map(mapLineItem)
);

export const chartData = createSelector(
  images, standards, groups, lines,
  (images, standards, groups, lines) => {
    const imageItems = images.map(mapImageItem);
    const standardItems = standards.map(std => mapStandardItem(std, groups));

    return imageItems
      .toList()
      .concat(standardItems.toList())
      .concat(lines);
  }
);