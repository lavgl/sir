export const prop = key => immutableObject => {
  return Array.isArray(key)
    ? immutableObject.getIn(key)
    : immutableObject.get(key);
}

export const first = immutableObject => immutableObject.first();

export function log(arg) {
  console.log(arg);
  return arg;
}

export const count = predicate => collection => collection.count(predicate); 
