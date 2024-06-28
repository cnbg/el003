const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  uploadFile: (filePath, fileName) => ipcRenderer.invoke('upload-file', { filePath, fileName }),
  uploadVideo: (filePath, fileName) => ipcRenderer.invoke('upload-video', { filePath, fileName }),
  uploadModel: (filePath, fileName) => ipcRenderer.invoke('upload-model', { filePath, fileName }),
  getPaths: () => ipcRenderer.invoke('get-paths'),
  saveBook: (book, fileName) => ipcRenderer.invoke('save-book', book, fileName),
  updateBook: async (book, fileName) => ipcRenderer.invoke('save-book', book, fileName),
  loadBooks: () => ipcRenderer.invoke('load-books'),
  getBookFileName: (bookId) => ipcRenderer.invoke('get-book-filename', bookId),
  deleteBook: (fileName) => ipcRenderer.invoke('delete-book', fileName),
  getTinyMCEBaseUrl: async () => await ipcRenderer.invoke('get-tinymce-base-path'),
  saveSurvey: (survey, fileName) => ipcRenderer.invoke('save-survey', survey, fileName),
  getSurvey: (fileName) => ipcRenderer.invoke('get-survey', fileName)
});
