import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'original-fs';

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
                // nodeIntegration: true,  // nodeIntegration should be false for security
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

    ipcMain.handle('upload-file', async (event, { filePath, fileName }) => {
        console.error('upload-file:', filePath, fileName);
        try {
            const resourcesPath = process.resourcesPath;
            const userDataPath = app.getPath('userData');
            const appPath = app.getAppPath();

            if (!app.isPackaged) {
                const uploadDir = path.join(appPath, 'src', 'data', 'images');
                const uploadPath = path.join(uploadDir, fileName);

                await fs.promises.mkdir(uploadDir, { recursive: true });
                await fs.promises.copyFile(filePath, uploadPath);
                return { success: true, filePath: `${appPath}/src/data/images/${fileName}` };
            } else {
                const uploadDir = path.join(resourcesPath, 'data', 'images');
                const uploadPath = path.join(uploadDir, fileName);

                await fs.promises.mkdir(uploadDir, { recursive: true });
                await fs.promises.copyFile(filePath, uploadPath);
                return { success: true, filePath: `${resourcesPath}/data/images/${fileName}` };
            }

        } catch (error) {
            console.error('upload-file-error:', error);
            return { success: false, message: error.message };
        }
    });

    ipcMain.handle('save-book', async (event, book) => {
        try {
            const resourcesPath = process.resourcesPath;
            const appPath = app.getAppPath();
            let bookDir;       
            const standardBook = {
                id: book.id,
                title: book.title,
                desc: book.desc,
                author: book.author,
                tags: book.tags,
                date: book.date,
                cover: book.cover,
                pages: book.pages,
                chapters: book.chapters || []  
            };
    
            if (!app.isPackaged) {
                bookDir = path.join(appPath, 'src', 'data', 'books');
            } else {
                bookDir = path.join(resourcesPath, 'data', 'books');
            }
    
            const bookPath = path.join(bookDir, `${book.id}.json`);
    
            await fs.promises.mkdir(bookDir, { recursive: true });
            await fs.promises.writeFile(bookPath, JSON.stringify(standardBook, null, 2), 'utf8');

            const booksJsonPath = path.join(appPath, 'src', 'data', 'books.json');
            let booksJson = [];
            try {
                const booksJsonData = await fs.promises.readFile(booksJsonPath, 'utf8');
                booksJson = JSON.parse(booksJsonData);
            } catch (err) {
                console.error('books.json read error:', err);
            }
            booksJson.push(standardBook);
            await fs.promises.writeFile(booksJsonPath, JSON.stringify(booksJson, null, 2), 'utf8');

           return { success: true, filePath: bookPath };
        } catch (error) {
            console.error('save-book-error:', error);
            return { success: false, message: error.message };
        }
    });
    
}
