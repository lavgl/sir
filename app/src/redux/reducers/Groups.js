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
  openFileSuccess
} from 'actions/Files';

import {
  fullReset
} from 'actions/Result';

const mock = prepareMock({
  0: { id: 0, color: getColorForGroup(0) },
  1: { id: 1, color: getColorForGroup(1) },
  2: { id: 2, color: getColorForGroup(2) }
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
  [fullReset]: () => initialState,
  [openFileSuccess]: (state, { payload }) => state.set('groups', payload.get('groups'))
}, initialState);

export default Groups;
