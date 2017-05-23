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
  0: { id: 0, x: -5, y: -5, groupId: 0 },
  1: { id: 1, x: 0, y: 0, groupId: 1 },
  2: { id: 2, x: 5, y: 5, groupId: 2 },
  3: { id: 3, x: 5, y: -5, groupId: 3 },
  4: { id: 4, x: -5, y: 5, groupId: 4 },
  5: { id: 5, x: 6, y: 4, groupId: 2 }
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