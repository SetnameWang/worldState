const { app, Tray, Menu, nativeImage } = require('electron');
const { Window } = require('./Window.js');

const contextMenu = Menu.buildFromTemplate([
  {
    label: '打开/关闭希图斯时钟',
    click: function(){
      if (Window.clock.clock === null){
        Window.clock.show();
      }else{
        Window.clock.close();
      }
    }
  },
  {
    label: '退出',
    click: function(){
        app.quit();
    }
  }
]);

class TrayMenu {
  // Create a variable to store our tray
  // Public: Make it accessible outside of the class;
  // Readonly: Value can't be changed

  // Path where should we fetch our icon;

  constructor() {
    var appinfo = require('../appinfo.js');
    this.title = appinfo.appName;
    this.iconPath = appinfo.icon16;
  }

  createTray(){
    this.tray = new Tray(this.iconPath);
    this.tray.setToolTip(this.title);
    this.tray.setContextMenu(contextMenu);

    this.tray.on('double-click',()=>{
      require('./Window.js').Window.createWindow();
    })
  }

  createNativeImage() {
    // Since we never know where the app is installed,
    // we need to add the app base path to it.
    const path = `${electron.app.getAppPath()}${this.iconPath}`;
    const image = electron.nativeImage.createFromPath(path);
    // Marks the image as a template image.
    image.setTemplateImage(true);
    return image;
  }
}

module.exports = {
  TrayMenu: new TrayMenu()
}
