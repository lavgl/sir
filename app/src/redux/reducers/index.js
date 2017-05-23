import { combineReducers } from 'redux';

import Images from './Images';
import UI from './UI';
import Standards from './Standards';
import Groups from './Groups';
import Result from './Result';

const rootReducer = combineReducers({
  UI,
  Images,
  Standards,
  Groups,
  Result
});

export default rootReducer;