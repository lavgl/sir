export const prop = key => immutableObject => {
  return Array.isArray(key)
    ? immutableObject.getIn(key)
    : immutableObject.get(key);
}

export const first = immutableObject => immutableObject.first();
