import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import {
  toggleOnIsResultCalculated,
  toggleOffIsResultCalculated,
  setResults
} from 'actions/Result';

const initState = fromJS({
  isCalculated: false,
  results: []
});

const resultReducer = handleActions({
  [toggleOnIsResultCalculated]: (state) => state.set('isCalculated', true),
  [toggleOffIsResultCalculated]: (state) => state.set('isCalculated', false),
  [setResults]: (state, action) => {
    console.log('set results', action);
    return state.set('results', fromJS(action.payload));
  }
}, initState);

export default resultReducer;