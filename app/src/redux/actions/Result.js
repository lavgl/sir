import { createAction } from 'redux-actions';
import { values } from 'ramda';

import {
  calculateResults
} from 'math/classifier';

export const toggleOnIsResultCalculated = createAction('TOGGLE_ON_IS_RESULT_CALCULATED');
export const toggleOffIsResultCalculated = createAction('TOGGLE_OFF_IS_RESULT_CALCULATED');
export const setResults = createAction('SET_RESULTS');

export function calculateResultsAction() {
  return (dispatch, getState) => {
    const state = getState();
    const standards = values(state.Standards.get('standards').toJS());
    const images = values(state.Images.get('images').toJS());

    console.log('standards', standards);
    console.log('images', images);

    const results = calculateResults(standards, images);
    console.log('results', results);

    dispatch(toggleOnIsResultCalculated());
    dispatch(setResults(results));
  };
}