if (require('./update.js')) {
  return;
}

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 640, height: 480});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.on('closed', () => mainWindow = null);
})

app.on('window-all-closed', app.quit);
