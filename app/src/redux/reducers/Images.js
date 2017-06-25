import Immutable, { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
  prepareMock
} from 'utils';

import {
  addImage,
  updateImage,
  removeImage,

  setImageResult
} from 'actions/Images';

import {
  fullReset
} from 'actions/Result';

const mock = prepareMock({
  0: { id: 0, x: 1, y: 1 },
  1: { id: 1, x: 4, y: 2 },
  2: { id: 2, x: 4, y: 6 },
  3: { id: 3, x: 6, y: -4 },
  4: { id: 4, x: 2, y: -4 },
  5: { id: 5, x: -2, y: -2 },
  6: { id: 6, x: -2, y: 2 },
  7: { id: 7, x: -8, y: 2 },
  8: { id: 8, x: -4, y: -8 }
  // 9: { id: 9, x: 3, y: 3 },
  // 10: { id: 10, x: 3, y: 3 },
  // 11: { id: 11, x: 3, y: 3 },
});

const initialState = fromJS({
  images: mock
});

const mapImage = (payload = {}) => {
  return {
    x: payload.x,
    y: payload.y
  };
};

const imagesReducer = handleActions({
  [addImage]: (state, action) => {
    const images = state.get('images');

    const id = getNewIdForIndexedCollection(images);
    const newImage = Immutable
      .fromJS(mapImage(action.payload))
      .set('id', id);

    return state.setIn(['images', id], newImage);
  },
  [updateImage]: (state, action) => {
    const { image } = action.payload;
    const id = image.get('id');

    return state.setIn(['images', id], image);
  },
  [removeImage]: (state, action) => {
    const images = state.get('images');
    const id = action.payload.id;

    return state.set('images', images.remove(id));
  },
  [fullReset]: () => initialState
}, initialState);

export default imagesReducer;
