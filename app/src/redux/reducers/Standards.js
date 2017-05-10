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
  updateStandard,
  removeStandard
} from 'actions/Standards';

const mock = {
  0: { id: 0, x: 2, y: 4, groupId: 0 },
  1: { id: 1, x: -1, y: 2, groupId: 0 },
  2: { id: 2, x: 1, y: 2, groupId: 1 },
  3: { id: 3, x: 5, y: -0.2, groupId: 2 },
  4: { id: 4, x: 5, y: -0.2, groupId: 2 },
  5: { id: 5, x: 5, y: -0.2, groupId: 2 },
  6: { id: 6, x: 5, y: -0.2, groupId: 2 },
  7: { id: 7, x: 5, y: -0.2, groupId: 2 },
  8: { id: 8, x: 5, y: -0.2, groupId: 2 },
  9: { id: 9, x: 5, y: -0.2, groupId: 2 },
  10: { id: 10, x: 5, y: -0.2, groupId: 2 }
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
  },
  [removeStandard]: (state, action) => {
    const standards = state.get('standards');
    const id = toString(action.payload.id);
    return state.set('standards', standards.remove(id));
  }
}, initialState);

export default Standard;