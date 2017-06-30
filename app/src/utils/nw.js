import fs from 'fs';

// cb should be plain function, not arrow function
export const createNativeFileDialog = selector => () => {
  const chooser = document.querySelector(selector);

  setTimeout(() => chooser.click(), 0);

  return new Promise(resolve => {
    chooser.addEventListener('change', function listener() {
      chooser.removeEventListener('change', listener);

      resolve(this.value);
    });
  });
}

export function loadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

export function saveFile({ path, content }) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, 'utf8', err => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}
