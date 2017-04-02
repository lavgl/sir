import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection,
  getRandomColor
} from '../utils';

import {
  addGroup,
  removeGroup
} from 'actions/Groups';

const mock = {
  0: { id: 0, color: 'red' },
  1: { id: 1, color: 'green' },
  2: { id: 2, color: 'blue' }
};

const initialState = Immutable.fromJS({
  groups: mock
});

const Groups = handleActions({
  [addGroup]: (state, action) => {
    const groups = state.get('groups');
    const id = getNewIdForIndexedCollection(groups);
    const color = getRandomColor();
    const newGroup = Immutable.fromJS({ id, color });
    return state.setIn(['groups', id], newGroup);
  }
}, initialState);

export default Groups;