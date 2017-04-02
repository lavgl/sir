import { combineReducers } from 'redux';

import Images from './Images';
import UI from './UI';
import Standards from './Standards';
import Groups from './Groups';

const rootReducer = combineReducers({
  UI,
  Images,
  Standards,
  Groups
});

export default rootReducer;