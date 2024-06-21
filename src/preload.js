const { contextBridge, ipcRenderer } = require('electron');
const { app } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('upload-file', { filePath, fileName }),
  getPaths: () => ipcRenderer.invoke('get-paths')
});