import { buildDecisiveFn } from './decisiveFn';

import { distance } from './plainDistance';

function buildSeparatingFn(standard1, standard2) {
  const decisiveFn1 = buildDecisiveFn(standard1);
  const decisiveFn2 = buildDecisiveFn(standard2);

  return image => decisiveFn1(image) - decisiveFn2(image);
}

function buildSeparatingFnsMaptrix(standards) {
  const separatingFnsMatrix = {};
  const l = standards.length;

  for (let i = 0; i < l; i++) {
    separatingFnsMatrix[i] = {};
    for (let j = i + 1; j < l; j++) {
      separatingFnsMatrix[i][j] = buildSeparatingFn(standards[i], standards[j]);
    }
  }

  return separatingFnsMatrix;
}

const applySeparatingFns = matrix => image => {
  const results = {};
  const l = Object.keys(matrix).length;

  for (let i = 0; i < l; i++) {
    results[i] = {};
    for (let j = i + 1; j < l; j++) {
      const fn = matrix[i][j];
      results[i][j] = fn && fn(image);
    }
  }

  return results;
}

function checkIsImageInGroupViaSeparatingFns(matrix, groupId) {
  const l = Object.keys(matrix).length;
  let isIn = true;

  for (let i = groupId + 1; i < l; i++) {
    if (matrix[groupId][i] < 0) isIn = false;
  }

  for (let i = 0; i < groupId; i++) {
    if (matrix[i][groupId] > 0) isIn = false;
  }

  return isIn;
}

export default function calculateResultsWithSeparatingFunctions(standards, images) {
  const separatingFnsMatrix = buildSeparatingFnsMaptrix(standards);

  return images.map(image => {
    const values = applySeparatingFns(separatingFnsMatrix)(image);
    const standardIndex = standards
      .map(std => std.id)
      .map(stdId => checkIsImageInGroupViaSeparatingFns(values, stdId))
      .indexOf(true);

    const standard = standards[standardIndex];

    return {
      image,
      standard,
      distance: distance(standard, image)
    };
  });
}
