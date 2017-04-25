import { color } from 'd3-color';
import {
  toString
} from 'utils';

export const getNewIdForIndexedCollection = (collection) => {
  return toString(collection
      .keySeq()
      .map(index => index - 0)
      .max() + 1);
};

export const getRandomColor = () => {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return color(`rgb(${r}, ${g}, ${b})`);
};