import { createAction } from 'redux-actions';
import { values } from 'ramda';

import {
  calculateResultsWithPlainDistance,
  calculateResultsWithDecisiveFunctions,
  calculateResultsWithSeparatingFunctions
} from 'math';

import {
  PLAIN_DISTANCE_ALGORITHM,
  DECISIVE_FUNCTION_ALGORITHM,
  SEPARATING_FUNCTION_ALGORITHM
} from 'constants/UI';

import {
  getAverageStandards,
  removeFadedStandards
} from '../../pages/Main/utils';

export const toggleOnIsResultCalculated = createAction('TOGGLE_ON_IS_RESULT_CALCULATED');
export const toggleOffIsResultCalculated = createAction('TOGGLE_OFF_IS_RESULT_CALCULATED');
export const setResults = createAction('SET_RESULTS');
export const resetResult = createAction('RESET_RESULT');
export const fullReset = createAction('FULL_RESET');

const algorithmsHash = {
  [PLAIN_DISTANCE_ALGORITHM]: calculateResultsWithPlainDistance,
  [DECISIVE_FUNCTION_ALGORITHM]: calculateResultsWithDecisiveFunctions,
  [SEPARATING_FUNCTION_ALGORITHM]: calculateResultsWithSeparatingFunctions
};

export function calculateResultsAction() {
  return (dispatch, getState) => {
    const state = getState();
    const shouldAverageStandards = state.UI.get('shouldAverageStandards');
    const standardsInState = state.Standards.get('standards');
    const algorithm = state.UI.get('calculationAlgorithm');

    const calculate = algorithmsHash[algorithm];

    let standards;

    if (shouldAverageStandards) {
      const averageStandards = getAverageStandards(standardsInState);
      const standardsWithoutFaded = removeFadedStandards(standardsInState);

      standards = values(standardsWithoutFaded.concat(averageStandards).toJS());
    } else {
      standards = values(standardsInState.toJS());
    }

    const images = values(state.Images.get('images').toJS());
    const results = calculate(standards, images);

    dispatch(toggleOnIsResultCalculated());
    dispatch(setResults(results));
  };
}
