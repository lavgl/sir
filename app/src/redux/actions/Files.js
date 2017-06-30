import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';
import { compose, prop, pick } from 'ramda';

import { CALL_IO } from 'middlewares/io';
import {
  formatSaveFilePath,
  mapStateToFileContent,
  mapFileContentToState,
  numberizeIds
} from 'utils';

export const OPEN_FILE = 'OPEN_FILE';
export const SAVE_FILE = 'SAVE_FILE';

function openFileDialog() {
  return {
    [CALL_IO]: {
      method: 'openFileDialog'
    }
  };
}

function saveFileDialog() {
  return {
    [CALL_IO]: {
      method: 'saveFileDialog'
    }
  };
}

function loadFile(path) {
  return {
    [CALL_IO]: {
      method: 'loadFile',
      params: [path]
    }
  };
}

function _saveFile({ path, content }) {
  return {
    [CALL_IO]: {
      method: 'saveFile',
      params: [{ path, content }]
    }
  };
}

export const OPEN_FILE_SUCCESS = 'OPEN_FILE_SUCCESS';
export const OPEN_FILE_FAILURE = 'OPEN_FILE_FAILURE';

export const openFileSuccess = createAction(OPEN_FILE_SUCCESS);
export const openFileFailure = createAction(OPEN_FILE_FAILURE);

export function openFile() {
  return (dispatch) => {
    dispatch(openFileDialog())
      .then(compose(dispatch, loadFile, prop('payload')))
      .then(compose(dispatch, openFileSuccess, numberizeIds, fromJS, mapFileContentToState, prop('payload')))
      .catch(err => {
        // TODO: notify user the file is broken
        console.log('err', err);
      });
  };
}

export function saveFile() {
  return (dispatch, getState) => {
    console.log('save file dialog');
    dispatch(saveFileDialog())
      .then(compose(formatSaveFilePath, prop('payload')))
      .then(path => ({ path, content: mapStateToFileContent(getState())}))
      .then(compose(dispatch, _saveFile, pick(['path', 'content'])))
      .then(() => {
        //  TODO: notify user the file is saved
        console.log('successfully saved');
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}
