const { contextBridge, ipcRenderer } = require('electron');
const { app } = require('electron');
const path = require('path');
const fs = require('fs');

contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('upload-file', { filePath, fileName }),
  uploadVideo: (filePath, fileName) => ipcRenderer.invoke('upload-video', { filePath, fileName }),
  uploadModel: (filePath, fileName) => ipcRenderer.invoke('upload-model', { filePath, fileName }),
  getPaths: () => ipcRenderer.invoke('get-paths'),
  saveBook: (book, fileName) => ipcRenderer.invoke('save-book', book, fileName),
  loadBooksFromDirectory: (directoryPath) => {
    return ipcRenderer.invoke('load-books-from-directory', directoryPath);
  },
});