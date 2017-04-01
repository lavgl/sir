import { createStore, compose } from 'redux';
import rootReducer from '../reducers';
import DevTools from '../../containers/DevTools';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      DevTools.instrument()
    )
  );

  return store;
};

export default configureStore;