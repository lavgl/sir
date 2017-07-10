import { createAction } from 'redux-actions';
import { values } from 'ramda';

import {
  calculateResultsWithPlainDistance,
  calculateResultsWithDecisiveFunctions,
  calculateResultsWithSeparatingFunctions
} from 'math';

export const toggleOnIsResultCalculated = createAction('TOGGLE_ON_IS_RESULT_CALCULATED');
export const toggleOffIsResultCalculated = createAction('TOGGLE_OFF_IS_RESULT_CALCULATED');
export const setResults = createAction('SET_RESULTS');
export const resetResult = createAction('RESET_RESULT');
export const fullReset = createAction('FULL_RESET');

export function calculateResultsAction() {
  return (dispatch, getState) => {
    const state = getState();
    const standards = values(state.Standards.get('standards').toJS());
    const images = values(state.Images.get('images').toJS());

    const results = calculateResultsWithSeparatingFunctions(standards, images);

    dispatch(toggleOnIsResultCalculated());
    dispatch(setResults(results));
  };
}
