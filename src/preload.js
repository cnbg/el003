const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('upload-file', { filePath, fileName }),
  saveBook: (book) => ipcRenderer.invoke('save-book', book),
  saveChapter: (bookId, chapter) => ipcRenderer.invoke('save-chapter', { bookId, chapter }),  
  uploadVideo: (filePath, fileName) => ipcRenderer.invoke('upload-video', { filePath, fileName }),
});
