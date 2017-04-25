import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

import {
  getNewIdForIndexedCollection
} from '../utils';

import {
  toString
} from 'utils';

import {
  addImage,
  updateImage,

  setImageResult
} from 'actions/Images';

const mock = {
  0: { id: 0, x: 0, y: 0 },
  1: { id: 1, x: 1, y: 1 },
  2: { id: 2, x: 2, y: 2 },
  3: { id: 3, x: 3, y: 3 },
  4: { id: 4, x: 3, y: 3 },
  5: { id: 5, x: 3, y: 3 },
  6: { id: 6, x: 3, y: 3 },
  7: { id: 7, x: 3, y: 3 },
  8: { id: 8, x: 3, y: 3 },
  9: { id: 9, x: 3, y: 3 },
  10: { id: 10, x: 3, y: 3 },
  11: { id: 11, x: 3, y: 3 },
};

const initialState = Immutable.fromJS({
  images: mock
});

const mapImage = (payload) => {
  return {
    x: payload.x,
    y: payload.y
  };
};

const mapResult = (result) => {
  return {
    group: result.group,
    standard: result.standard,
    distance: result.distance
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
    const images = state.get('images');

    const { image } = action.payload;
    const id = toString(image.get('id'));

    return state.setIn(['images', id], image);
  },
  [setImageResult]: (state, action) => {
    const images = state.get('images');
    const { id, result } = action.payload;

    const newImage = images.get(id)
      .merge(Immutable.fromJS(mapResult(result)));

    return state.set('images', images.set(id, newImage));
  }
}, initialState);

export default imagesReducer;