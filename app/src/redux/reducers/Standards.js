import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
 toString
} from 'utils';

import {
  addStandard,
  updateStandard
} from 'actions/Standards';

const mock = {
  0: { id: 0, x: 2, y: 4, groupId: 0 },
  1: { id: 1, x: -1, y: 2, groupId: 0 },
  2: { id: 2, x: 1, y: 2, groupId: 1 },
  3: { id: 3, x: 5, y: -0.2, groupId: 2 }
};

const initialState = Immutable.fromJS({
  standards: mock
});

const mapStandard = (standard) => {
  return {
    x: standard.x,
    y: standard.y,
    groupId: standard.groupId
  }
};

const Standard = handleActions({
  [addStandard]: (state, action) => {
    const standards = state.get('standards');

    const id = getNewIdForIndexedCollection(standards);
    const newStandard = Immutable
      .fromJS(mapStandard(action.payload))
      .set('id', id);

    return state.setIn(['standards', id], newStandard);
  },
  [updateStandard]: (state, action) => {
    const standards = state.get('standards');

    const { standard } = action.payload;
    const id = toString(standard.get('id'));

    return state.setIn(['standards', id], standard);

  }
}, initialState);

export default Standard;