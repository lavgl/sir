import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
  getColorForGroup
} from 'utils';

import {
  addGroup,
  removeGroup
} from 'actions/Groups';

const mock = {
  0: { id: 0, color: getColorForGroup(0) },
  1: { id: 1, color: getColorForGroup(1) },
  2: { id: 2, color: getColorForGroup(2) },
  3: { id: 3, color: getColorForGroup(3) },
  4: { id: 4, color: getColorForGroup(4) },
  5: { id: 5, color: getColorForGroup(5) },
  6: { id: 6, color: getColorForGroup(6) },
  7: { id: 7, color: getColorForGroup(7) },
  8: { id: 8, color: getColorForGroup(8) },
  9: { id: 9, color: getColorForGroup(9) },
  10: { id: 10, color: getColorForGroup(10) }
};

const initialState = Immutable.fromJS({
  groups: mock
});

const Groups = handleActions({
  [addGroup]: (state, action) => {
    const groups = state.get('groups');
    const id = getNewIdForIndexedCollection(groups);
    const color = getColorForGroup(id);
    const newGroup = Immutable.fromJS({ id, color });
    return state.setIn(['groups', id], newGroup);
  }
}, initialState);

export default Groups;
