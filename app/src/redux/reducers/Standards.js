import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
  prepareMock
} from 'utils';

import {
  addStandard,
  updateStandard,
  removeStandard
} from 'actions/Standards';

import {
  openFileSuccess
} from 'actions/Files';

import {
  fullReset
} from 'actions/Result';

const mock = prepareMock({
  0: { id: 0, x: -5, y: -5, groupId: 0 },
  1: { id: 1, x: 0, y: 0, groupId: 1 },
  2: { id: 2, x: 5, y: 5, groupId: 2 },
  3: { id: 3, x: 5, y: -5, groupId: 2 }
});

const initialState = fromJS({
  standards: mock
});

const mapStandard = (standard = {}) => {
  return {
    x: standard.x,
    y: standard.y,
    groupId: standard.groupId || 0
  }
};

const Standard = handleActions({
  [addStandard]: (state, action) => {
    const standards = state.get('standards');

    const id = getNewIdForIndexedCollection(standards);
    const newStandard = fromJS(mapStandard(action.payload)).set('id', id);

    return state.setIn(['standards', id], newStandard);
  },
  [updateStandard]: (state, action) => {
    const standards = state.get('standards');

    const { standard } = action.payload;
    const id = standard.get('id');

    return state.setIn(['standards', id], standard);
  },
  [removeStandard]: (state, action) => {
    const standards = state.get('standards');
    const id = action.payload.id;
    return state.set('standards', standards.remove(id));
  },
  [fullReset]: () => initialState,
  [openFileSuccess]: (state, { payload }) => state.set('standards', payload.get('standards'))
}, initialState);

export default Standard;
