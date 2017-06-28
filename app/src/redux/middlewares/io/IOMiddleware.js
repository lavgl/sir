import IOAdapter from './IOAdapter';

export const CALL_IO = Symbol('CALL_IO');

const IOMiddleware = store => next => action => {
  if (!action[CALL_IO]) {
    return next(action);
  }

  const callIO = action[CALL_IO];

  const {
    method,
    params,
    requestAction,
    successAction,
    failureAction
  } = callIO;

   if (typeof method !== 'string') {
     throw new Error('method field should be a string');
   }

   if (params !== null && params !== undefined && !Array.isArray(params)) {
     throw new Error('params field should be an array or should be not defined');
   }

   performAction(store, next, requestAction);

   const args = params || [];

   const adapterFn = IOAdapter[method];

   if (!adapterFn) {
     throw new Error('No method defined in IO Adapter:', method);
   }

   return adapterFn.apply(null, args)
    .then(resp => performAction(store, next, successAction, resp))
    .catch(err => performAction(store, next, failureAction, err, true));
};

function performAction({ dispatch, getState }, next, action, payload, isError) {
  if (!action) {
    const resp = { payload };
    return isError ? Object.assign({}, resp, isError) : resp;
  }

  if (typeof action === 'string') {
    const actionObject = { type: action, payload };

    return next(isError
      ? Object.assign({}, actionObject, isError)
      : actionObject);
  }

  throw new Error('action must be either string or not defined');
}

export default IOMiddleware;
