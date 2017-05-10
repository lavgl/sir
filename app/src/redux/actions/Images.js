import { createAction } from 'redux-actions';

export const addImage = createAction('ADD_IMAGE');
export const updateImage = createAction('UPDATE_IMAGE');
export const removeImage = createAction('REMOVE_IMAGE');

// TODO: move to separated reducer
export const setImageResult = createAction('SET_IMAGE_RESULT');