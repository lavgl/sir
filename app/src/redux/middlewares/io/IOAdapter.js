import {
  createNativeFileDialog,
  loadFile,
  saveFile
} from 'utils/nw';


const OPEN_FILE_SELECTOR = '#openFile';
const SAVE_FILE_SELECTOR = '#saveFile';

const openFileDialog = createNativeFileDialog(OPEN_FILE_SELECTOR);
const saveFileDialog = createNativeFileDialog(SAVE_FILE_SELECTOR);

const adapter = {
  loadFile,
  openFileDialog,
  saveFile,
  saveFileDialog
};

export default adapter;
