const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

class NotificationWindow {
  constructor(){
    this.notifications = [];
  }

  show(title, body){
    var tempNotifi = {};
    if (require('./Clock.js').clock.clock === null){
      var clockDistance = 0;
    }else{
      var clockDistance = 90;
    }
    tempNotifi.window = new BrowserWindow({
      width: 300,
      height: 80,
      x: electron.screen.getPrimaryDisplay().workAreaSize.width - 320,
      y: electron.screen.getPrimaryDisplay().workAreaSize.height - (this.notifications.length + 1) * 90 - clockDistance,
      frame: false,
      resizable: false,
      //transparent: true,
      alwaysOnTop: true,
      movable: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    tempNotifi.window.setSkipTaskbar(true);
    tempNotifi.window.setIgnoreMouseEvents(true);

    var tempBody = body.split('\n');

    var str = '/notify.html?title=' + title;

    for (var i in tempBody){
      str += '&body' + i + '=' + tempBody[i];
    }

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL + str || url.format({
            pathname: path.join(__dirname, '/../../build' + str),
            protocol: 'file:',
            slashes: true
        });
    tempNotifi.window.on('closed', ()=>{
        this.notifications.pop();
    })

    tempNotifi.window.loadURL(startUrl);

    this.notifications.push(tempNotifi);
  }
}

module.exports = {
  notifier: new NotificationWindow(),
}
