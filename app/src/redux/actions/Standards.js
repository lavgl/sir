import { createAction } from 'redux-actions';

import {
  toNumber
} from 'utils';

import {
  addGroupIfNotExist,
  removeGroupIfNoStandards
} from './Groups';

export const addStandard = createAction('ADD_STANDARD');
export const updateStandard = createAction('UPDATE_STANDARD');
export const removeStandard = createAction('REMOVE_STANDARD');

export function updateStandardAndGroup({ standard }) {
  return (dispatch, getState) => {
    const state = getState();
    const standards = state.Standards.getIn(['standards']);

    const _standard = standard.update('groupId', toNumber);

    const id = standard.get('id');
    const oldStandard = standards.get(id);

    const groupId = _standard.get('groupId');
    const oldGroupId = oldStandard.get('groupId');

    dispatch(updateStandard({ standard: _standard }));
    dispatch(removeGroupIfNoStandards({ groupId: oldGroupId }));
    dispatch(addGroupIfNotExist({ groupId }));
  };
}
