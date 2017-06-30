import { fromJS } from 'immutable';
import { schemeCategory20 } from 'd3-scale';

import {
  prop,
  first
} from './fp';

export function toNumber(string) {
  return string - 0;
}

export function isStandardDefined(standard) {
  return standard.has('id') && standard.get('id') !== undefined
    && standard.has('x') && standard.get('x') !== undefined
    && standard.has('y') && standard.get('y') !== undefined
    && (standard.has('groupId') || standard.has('group'));
}

export function isAllStandardsDefined(standards) {
  return standards.every(isStandardDefined);
}

export function isImageDefined(image) {
  return image.has('id') && image.get('id') !== undefined
    && image.has('x') && image.get('x') !== undefined
    && image.has('y') && image.get('y') !== undefined;
}

export function isAllImagesDefined(images) {
  return images.every(isImageDefined);
}

export function getColorForGroup(groupId) {
  return schemeCategory20[groupId % (schemeCategory20.length - 1)];
}

export function getStandardDatumColor(standard) {
  return standard.getIn(['group', 'color']);
}

export function prepareMock(plainObject) {
  return fromJS(plainObject)
    .toList()
    .groupBy(prop('id'))
    .map(first);
}

const JSON_EXT_NAME = '.json';
const JSON_FILE_REG_EXP = new RegExp(JSON_EXT_NAME.concat('$'));

function isJSON(path) {
  return JSON_FILE_REG_EXP.test(path);
}

export function formatSaveFilePath(path) {
  const _isJSON = isJSON(path);
  return _isJSON ? path : path.concat(JSON_EXT_NAME);
}

export function mapStateToFileContent(state) {
  const standards = state.Standards.get('standards').toJS();
  const images = state.Images.get('images').toJS();
  const groups = state.Groups.get('groups').toJS();

  return JSON.stringify({ standards, images, groups });
}

export function mapFileContentToState(content) {
  return JSON.parse(content);
}

export function numberizeIds(immutableObj) {
  if (!immutableObj.mapKeys) {
    return immutableObj;
  }

  const withMappedKeys = immutableObj.mapKeys(key => {
    const k = toNumber(key);
    return typeof k === 'number' && !isNaN(k) ? k : key;
  });

  return withMappedKeys.map(numberizeIds);
}
