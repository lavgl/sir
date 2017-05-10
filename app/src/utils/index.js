export function toString(any) {
  return any.toString();
}

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