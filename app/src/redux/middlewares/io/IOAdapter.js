import fs from 'fs';

const OPEN_FILE_SELECTOR = '#openFile';
const SAVE_FILE_SELECTOR = '#saveFile';

// cb should be plain function, not arrow function
const createNativeFileDialog = selector => () => {
  const chooser = document.querySelector(selector);

  setTimeout(() => chooser.click(), 0);

  return new Promise(resolve => {
    chooser.addEventListener('change', function listener() {
      chooser.removeEventListener('change', listener);

      resolve(this.value);
    });
  });
}

function loadFile(path) {
  console.log('load file path', path);
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

const openFileDialog = createNativeFileDialog(OPEN_FILE_SELECTOR);

const adapter = {
  loadFile,
  openFileDialog
};

export default adapter;
