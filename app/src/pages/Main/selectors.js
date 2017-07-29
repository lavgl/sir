import { createSelector } from 'reselect';
import { complement } from 'ramda';

import {
  mapImageItem,
  mapStandardItem,
  mapFadedStandardItem,
  mapLineItem,
  defineStandardsTypes,
  mapTypedStandardItem,
  populateAverageStandards
} from './utils';

import {
  isStandardDefined,
  isImageDefined,
  formatDistance
} from 'utils';

import { prop, filter } from 'utils/fp';

const isImageNotDefined = complement(isImageDefined);
const isStandardNotDefined = complement(isStandardDefined);

const images = state => state.Images.get('images');
const standards = state => state.Standards.get('standards');
const groups = state => state.Groups.get('groups');
const results = state => state.Result.get('results');
const shouldAverageStandards = state => state.UI.get('shouldAverageStandards');
export const isResultCalculated = state => state.Result.get('isCalculated');
export const calculationAlgorithm = state => state.UI.get('calculationAlgorithm');

const lines = createSelector(
  results, (results) => results.map(mapLineItem)
);

const definedStandards = createSelector(standards, filter(isStandardDefined))

const transformedStandards = createSelector(
  [definedStandards, shouldAverageStandards, groups],
  (standards, shouldAverageStandards, groups) => {
    if (shouldAverageStandards) {
      return defineStandardsTypes(standards).toList()
        .concat(populateAverageStandards(standards))
        .map(mapTypedStandardItem(groups));
    } else {
      return standards.map(std => mapStandardItem(std, groups)).toList();
    }
  }
);

const transformedImages = createSelector(
  [images], images => images.map(mapImageItem).toList()
);

export const chartData = createSelector(
  [transformedImages, transformedStandards, lines],
  (images, standards, lines) =>
    images
      .concat(standards)
      .concat(lines));

export const isSubmitButtonDisabled = createSelector(
  images, standards,
  (images, standards) =>
    images.some(isImageNotDefined) ||
    standards.some(isStandardNotDefined)
);

const dataForImagesTable = createSelector(
  images, results,
  (images, results) => {
    if (!results || !results.size) return images;

    return images.map(image => {
      const result = results.find(r => r.getIn(['image', 'id']) === image.get('id'));

      return image.withMutations(image =>
        image
          .set('groupId', result.getIn(['standard', 'groupId']))
          .set('distance', formatDistance(result.get('distance'))))
    });
  }
)

export const sortedDataForImagesTable = createSelector(
  dataForImagesTable,
  dataForImagesTable =>
    dataForImagesTable.toList().sortBy(prop('id')));
