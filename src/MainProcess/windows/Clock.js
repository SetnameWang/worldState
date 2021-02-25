const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

class Clock{
  constructor(){
    this.clock = null;
  }

  show(){
    if (this.clock === null){
      let clockWindow = new BrowserWindow({
        width: 250,
        height: 80,
        x: electron.screen.getPrimaryDisplay().workAreaSize.width - 270,
        y: electron.screen.getPrimaryDisplay().workAreaSize.height - 90,
        frame: false,
        resizable: false,
        transparent: true,
        alwaysOnTop: true,
        movable: false,
        webPreferences: {
          nodeIntegration: true
        }
      });
      clockWindow.setSkipTaskbar(true);
      clockWindow.setIgnoreMouseEvents(true);
      // and load the index.html of the app.
      const startUrl = process.env.ELECTRON_START_URL + '/clock.html' || url.format({
              pathname: path.join(__dirname, '/../../build/clock.html'),
              protocol: 'file:',
              slashes: true
          });

      clockWindow.loadURL(startUrl);


      clockWindow.on('closed', function () {
          // Dereference the window object, usually you would store windows
          // in an array if your app supports multi windows, this is the time
          // when you should delete the corresponding element.
          this.clock = null;
      })

      this.clock = clockWindow;
    }
  }

  close(){
    if (this.clock !== null){
      this.clock.close();
      this.clock = null;
    }
  }
}

module.exports = {
  clock: new Clock(),
}
