import { CALL_IO } from 'middlewares/io';

export const OPEN_FILE = 'OPEN_FILE';
export const SAVE_FILE = 'SAVE_FILE';

function openFileDialog() {
  return {
    [CALL_IO]: {
      method: 'openFileDialog'
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

export function openFile() {
  return (dispatch) => {
    dispatch(openFileDialog())
      .then(({ payload }) => dispatch(loadFile(payload)))
      .then(fileContent => {
        console.log('file content', fileContent);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
}

export function saveFile() {
  return () => {
    console.log('save file dialog');
  };
}
