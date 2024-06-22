const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('upload-file', { filePath, fileName }),
  saveBook: (book) => ipcRenderer.invoke('save-book', book),
});
