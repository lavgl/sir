import { createSelector } from 'reselect';

export {
  getDataFactory,
  getRowsCountFactory
};

function getDataFactory() {
  return props => props.data;
}

function getRowsCountFactory(getData) {
  return createSelector(
    [getData],
    (data) => data.size
  );
}