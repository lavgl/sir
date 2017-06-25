import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { identity } from 'ramda';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
  getColorForGroup,
  prepareMock
} from 'utils';

import {
  prop
} from 'utils/fp';

import {
  addGroup,
  removeGroup
} from 'actions/Groups';

import {
  fullReset
} from 'actions/Result';

const mock = prepareMock({
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
});

const initialState = fromJS({
  groups: mock
});

const Groups = handleActions({
  [addGroup]: (state, action) => {
    const { groupId } = action.payload;

    const color = getColorForGroup(groupId);
    const newGroup = fromJS({ id: groupId, color });

    return state
      .setIn(['groups', groupId], newGroup)
      .sortBy(prop('id'));
  },
  [removeGroup]: (state, action) => state.deleteIn(['groups', action.payload.groupId]),
  [fullReset]: () => initialState
}, initialState);

export default Groups;
