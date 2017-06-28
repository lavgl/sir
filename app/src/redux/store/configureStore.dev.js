import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../../containers/DevTools';

import IOMiddleware from 'middlewares/io';

const options = {
  maxAge: 25
};

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, IOMiddleware),
      DevTools.instrument(options)
    )
  );

  return store;
};

export default configureStore;
