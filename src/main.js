import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'original-fs';
const fsOld = require('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure single instance
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    let mainWindow;

    const createWindow = () => {
        mainWindow = new BrowserWindow({
            backgroundColor: nativeTheme.shouldUseDarkColors ? '#333' : '#fff',
            width: 1300,
            height: 800,
            titleBarStyle: 'hidden-inset',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                devTools: true,
                webSecurity: false,
                nodeIntegration: true,  // nodeIntegration should be false for security
            },
        });

        if (!app.isPackaged) {
            mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
        } else {
            mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
           
        }

        mainWindow.on('closed', () => {
            mainWindow = null;
        });

        if(!app.isPackaged) {
            mainWindow.webContents.openDevTools()
        }
    };

    app.whenReady().then(() => {
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    if (require('electron-squirrel-startup')) {
        app.quit();
    }
    
    ipcMain.handle('get-tinymce-base-path', async () => {

        if (!app.isPackaged) {

            return '/src/tinymce/';

        } else {

            return path.join(process.resourcesPath, 'tinymce');

        }

    });
    ipcMain.handle('upload-file', async (event, { filePath, fileName }) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let uploadDir;
            let uploadPath;

            if (!app.isPackaged) {
                uploadDir = path.join(appPath, 'src', 'data', 'images');
                uploadPath = path.join(uploadDir, fileName);
            } else {
                uploadDir = path.join(resourcesPath, 'data', 'images');
                uploadPath = path.join(uploadDir, fileName);
            }

            await fs.promises.mkdir(uploadDir, { recursive: true });
            await fs.promises.copyFile(filePath, uploadPath);

            const fileUrl = `file://${uploadPath.replace(/\\/g, '/')}`;

            return { success: true, filePath: fileUrl };
        } catch (error) {
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('get-paths', async () => {
        const resourcesPath = process.resourcesPath;
        const userDataPath = app.getPath('userData');
        const appPath = app.getAppPath();

        return {
            success: true,
            resourcesPath,
            userDataPath,
            appPath,
        };
    });

    ipcMain.handle('save-book', async (event, book, fileName) => {

        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let booksDir;
            let bookPath;

            if (!app.isPackaged) {
                booksDir = path.join(appPath, 'src', 'data', 'books');
                bookPath = path.join(booksDir, fileName);
            } else {
                booksDir = path.join(resourcesPath, 'data', 'books');
                bookPath = path.join(booksDir, fileName);
            }

            await fs.promises.mkdir(booksDir, { recursive: true });
            await fs.promises.writeFile(bookPath, JSON.stringify(book, null, 2));

            return { success: true, message: 'Book saved successfully.' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('update-book', async (event, { book, fileName }) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let booksDir;
            let bookPath;

            if (!app.isPackaged) {
                booksDir = path.join(appPath, 'src', 'data', 'books');
                bookPath = path.join(booksDir, fileName);
            } else {
                booksDir = path.join(resourcesPath, 'data', 'books');
                bookPath = path.join(booksDir, fileName);
            }

            await fs.promises.mkdir(booksDir, { recursive: true });
            await fs.promises.writeFile(bookPath, JSON.stringify(book, null, 2));

            return { success: true, message: 'Book updated successfully.' };
        } catch (error) {
            console.error('Error updating book:', error);
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('load-books', async () => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();

            let booksDir;

            if (!app.isPackaged) {
                booksDir = path.join(appPath, 'src/data/books');
            } else {
                booksDir = path.join(resourcesPath, 'data/books');
            }

            const bookFiles = fs.readdirSync(booksDir).filter(file => path.extname(file) === '.json');
            const books = bookFiles.map(file => {
                const filePath = path.join(booksDir, file);
                const bookData = fs.readFileSync(filePath, 'utf-8');
                return JSON.parse(bookData);
            });
            return { success: true, books };
        } catch (error) {
            console.error('Error loading books:', error);
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('delete-book', async (event, fileName) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let booksDir;
            let bookPath;

            if (!app.isPackaged) {
                booksDir = path.join(appPath, 'src', 'data', 'books');
                bookPath = path.join(booksDir, fileName);
            } else {
                booksDir = path.join(resourcesPath,'data', 'books');
                bookPath = path.join(booksDir, fileName);
            }

            await fs.promises.unlink(bookPath);

            return { success: true, message: 'Book deleted successfully.' };
        } catch (error) {
            console.error('Error deleting book:', error);
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('get-book-filename', async (event, bookId) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let booksDir;

            if (!app.isPackaged) {
                booksDir = path.join(appPath, 'src', 'data', 'books');
            } else {
                booksDir = path.join(resourcesPath, 'data', 'books');
            }

            const bookFiles = fs.readdirSync(booksDir).filter(file => path.extname(file) === '.json');
            const bookFileName = bookFiles.find(file => {
                const filePath = path.join(booksDir, file);
                const bookData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                return bookData.id === bookId;
            });

            return bookFileName || null;
        } catch (error) {
            console.error('Error getting book file name:', error);
            return null;
        }
    });
    ipcMain.handle('upload-video', async (event, { filePath, fileName }) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let uploadDir;
            let uploadPath;

            if (!app.isPackaged) {
                uploadDir = path.join(appPath, 'src', 'data', 'videos');
                uploadPath = path.join(uploadDir, fileName);
            } else {
                uploadDir = path.join(resourcesPath,'data', 'videos');
                uploadPath = path.join(uploadDir, fileName);
            }

            await fs.promises.mkdir(uploadDir, { recursive: true });
            await fs.promises.copyFile(filePath, uploadPath);

            const fileUrl = `file://${uploadPath.replace(/\\/g, '/')}`;

            return { success: true, filePath: fileUrl };
        } catch (error) {
            return { success: false, message: error.message };
        }
    });
    
    ipcMain.handle('upload-model', async (event, { filePath, fileName }) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let uploadDir;
            let uploadPath;

            if (!app.isPackaged) {
                uploadDir = path.join(appPath, 'src', 'data', 'models');
                uploadPath = path.join(uploadDir, fileName);
            } else {
                uploadDir = path.join(resourcesPath, 'data', 'models');
                uploadPath = path.join(uploadDir, fileName);
            }

            await fs.promises.mkdir(uploadDir, { recursive: true });
            await fs.promises.copyFile(filePath, uploadPath);

            const fileUrl = `file://${uploadPath.replace(/\\/g, '/')}`;

            return { success: true, filePath: fileUrl };
        } catch (error) {
            return { success: false, message: error.message };
        }
    });
    
}