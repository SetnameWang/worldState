const electron = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

class Window{
  constructor(){
    this.mainWindow = require('./windows/MainWindow.js').mainWindow;
    this.clock = require('./windows/Clock.js').clock;
    this.notifier = require('./windows/NotificationWindow.js').notifier;
    electron.app.on('window-all-closed', function () {

    });
  }

  createWindow(){
    this.mainWindow.show();
  }
}

module.exports = {
  Window: new Window(),
}
