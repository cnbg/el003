
const { app, BrowserWindow, nativeTheme } = require('electron/main');
const path = require('node:path');
const sqlite3 = require('sqlite3').verbose();



// Create a connection to the SQLite database
const dbPath = path.join(__dirname, '../db-backend/databgdase.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
          
    } else {
        console.log('Connected to the SQLite database.');
        
        
    }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        backgroundColor: nativeTheme.shouldUseDarkColors ? '#333' : '#fff',
        width: 1300,
        height: 800,
        titleBarStyle: 'hidden-inset', // macOS only
        // frame: process.platform === 'darwin',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
            // devTools: !app.isPackaged,
        },
    });

    // and load the index.html of the app
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    // darwin - macOS
    //if (process.platform !== 'darwin') {
    app.quit();
    //}
});

// Handle database errors
db.on('error', (err) => {
    console.error('Database error:', err);
});

// Close the database connection when Electron is quitting
app.on('before-quit', () => {
    db.close();
});

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
