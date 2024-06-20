const { app, BrowserWindow, nativeTheme } = require('electron');
const path = require('path');
const { execFile } = require('child_process');

let serverProcess;

// Function to start the server
const startServer = () => {
  let serverPath;

  if (app.isPackaged) {
    serverPath = path.join(process.resourcesPath, 'server.js');
  } else {
    serverPath = path.join(__dirname, 'server.js');
  }

  console.log(`Starting server from path: ${serverPath}`);

  // Passing environment variables to server process
  const serverProcess = execFile('node', [serverPath], {
    env: {
      ...process.env,
      IMAGES_DIR: path.join(__dirname, '../src/data/images'), 
    }
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server stdout: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Server stderr: ${data}`);
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#333' : '#fff',
    width: 1300,
    height: 800,
    titleBarStyle: 'hidden-inset', // macOS only
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true,
    },
  });

  // and load the index.html of the app.
  if (process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    // mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  startServer();
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

  if (serverProcess) {
    serverProcess.kill();
  }
});