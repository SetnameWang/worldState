const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');


class MainWindow{
  constructor(){
    this.window = null;
  }

  show(){
    if (this.window === null){
      var appinfo = require('../../appinfo.js');
      // Create the browser window.
      let mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        title: appinfo.appName,
        icon: appinfo.icon16,
        frame: false,
        resizable: false,
        webPreferences: {
          nodeIntegration: true
        }
      });
      // and load the index.html of the app.
      const startUrl = process.env.ELECTRON_START_URL || url.format({
              pathname: path.join(__dirname, '/../../build/index.html'),
              protocol: 'file:',
              slashes: true
          });

      mainWindow.loadURL(startUrl);
      // Open the DevTools.
      mainWindow.webContents.openDevTools();
  /*
      // and load the index.html of the app.
      const startUrl = process.env.ELECTRON_START_URL || url.format({
              pathname: path.join(__dirname, '../../build/index.html'),
              protocol: 'file:',
              slashes: true
          });
      mainWindow.loadURL(startUrl);
      // Open the DevTools.
      mainWindow.webContents.openDevTools();
  */

      // Emitted when the window is closed.
      mainWindow.on('closed', ()=>{
          // Dereference the window object, usually you would store windows
          // in an array if your app supports multi windows, this is the time
          // when you should delete the corresponding element.
          this.window = null;
      })

      this.window = mainWindow;
    }else{
      this.window.focus();
    }
  }
}

module.exports = {
  mainWindow: new MainWindow(),
}
