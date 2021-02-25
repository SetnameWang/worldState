const {app} = require('electron');

const path = require('path');

const fs = require('fs');

const defaultSetting = {
  toast: [{
    type: 'CetusCycle-night',
    item: '',
    timeLeft: 600,
  }]
}

class Settings{
  constructor(){
    this.filename = path.join(app.getAppPath(), '/setting.json');
    this.event = null;
  }

  addToast(toast){
    this.settings.toast.push(toast);
    fs.writeFile(this.filename, JSON.stringify(this.settings), (res)=>{
      this.read();
    });
  }

  updateToast(toasts){
    this.settings.toast = toasts;
    fs.writeFile(this.filename, JSON.stringify(this.settings), (res)=>{
      this.read();
    });
  }

  on(callback){
    this.event = callback;
  }

  read(){
    const writeFile = ()=>{
      fs.writeFile(this.filename, JSON.stringify(defaultSetting), (res)=>{
        readFile()
      });
    }
    const readFile = ()=>{
      fs.readFile(this.filename, 'utf-8', (err, data)=>{
        if (err){
          writeFile();
        }
        if (data != undefined){
          this.settings = JSON.parse(data);
          this.event();
        }
      })
    }
    readFile();
  }
}

module.exports = {
  settings: new Settings()
}
