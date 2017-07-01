import { fromJS } from 'immutable';
import { compose, head } from 'ramda';
import { schemeCategory20 } from 'd3-scale';
import Ajv from 'ajv';

import {
  prop,
  first,
  log
} from './fp';

import {
  fileSchema
} from './schema';

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
  const standards = state.Standards.get('standards').toArray();
  const images = state.Images.get('images').toArray();
  const groups = state.Groups.get('groups').toArray();

  return JSON.stringify({ standards, images, groups });
}

export function parseFile(content) {
  return JSON.parse(content);
}

function formatAjvError(error) {
  return `${error.dataPath} ${error.message}`;
}

export function validateFile(content) {
  const ajv = new Ajv();
  const valid = ajv.validate(fileSchema, content);

  if (!valid) {
    throw new Error(formatAjvError(head(ajv.errors)));
  }

  return content;
}

function fromListToMap(list, key = 'id') {
  return list
    .groupBy(prop(key))
    .map(first);
}

function fromListsToMaps(content) {
  return content
    .withMutations(content =>
      content
        .update('standards', fromListToMap)
        .update('images', fromListToMap)
        .update('groups', fromListToMap));
}

export const mapFileContentToState = compose(log, fromListsToMaps, fromJS, validateFile, parseFile);
