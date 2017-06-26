import { createAction } from 'redux-actions';

export const addGroup = createAction('ADD_GROUP');
export const removeGroup = createAction('REMOVE_GROUP');

export function addGroupIfNotExist({ groupId }) {
  return (dispatch, getState) => {
    const state = getState();
    const group = state.Groups.getIn(['groups', groupId]);
    if (!group) {
      dispatch(addGroup({ groupId }));
    }
  };
}

export function removeGroupIfNoStandards({ groupId }) {
  return (dispatch, getState) => {
    const state = getState();
    const standards = state.Standards.get('standards');
    const standardsWithCurrentGroupId = standards
      .filter(std => std.get('groupId') === groupId);

    if (standardsWithCurrentGroupId.size === 0) {
      dispatch(removeGroup({ groupId }));
    }
  };
}
