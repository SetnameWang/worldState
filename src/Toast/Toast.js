const {Notification} = require('electron');

const timeInterval = 10;

class Toast{
  constructor(){
    this.state = require('../WorldState/worldState.js').WorldState.state;
    if (!Notification.isSupported()){
      this.notifier = require('../MainProcess/Window.js').Window.notifier;
    }
    this.cetus = {
      id: '',
      state: '',
    }
    this.interval = null;
  }

  start(){
    this.loadToast();
    clearInterval(this.interval);
    this.interval = setInterval(this.check.bind(this), timeInterval * 1000);
  }

  loadToast(){
    this.toast = require('../Settings').settings.settings.toast;
    for (var i in this.toast){
      this.toast[i].id = '';
    }
  }

  notify(title, body){
    if (Notification.isSupported()){
      var notification;
      notification = new Notification({
        title: title,
        body: body
      })
      notification.show();
    }else{
      this.notifier.show(title, body);
    }
  }

  check(){
    var notification;
    for (var i in this.toast){
      switch (this.toast[i].type) {
        case 'CetusCycle-night':
          if (this.state.cetusCycle.type === '白天' &&
            (this.state.cetusCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.cetusCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.cetusCycle.id
          ){
            this.notify('希图斯时间', '希图斯即将进入夜晚\n当前状态: ' + this.state.cetusCycle.toString());

            this.toast[i].id = this.state.cetusCycle.id;
          }
          break;
        case 'CetusCycle-day':
          if (this.state.cetusCycle.type === '夜晚' &&
            (this.state.cetusCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.cetusCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.cetusCycle.id
          ){
            this.notify('希图斯时间', '希图斯即将进入白天\n当前状态: ' + this.state.cetusCycle.toString());

            this.toast[i].id = this.state.cetusCycle.id;
          }
          break;
        case 'VallisCycle-cold':
          if (this.state.vallisCycle.type === '温暖' &&
            (this.state.vallisCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.vallisCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.vallisCycle.id
          ){
            this.notify('奥布山谷时间', '奥布山谷即将进入寒冷状态\n当前状态: ' + this.state.vallisCycle.toString());

            this.toast[i].id = this.state.vallisCycle.id;
          }
          break;
        case 'VallisCycle-warm':
          if (this.state.vallisCycle.type === '寒冷' &&
            (this.state.vallisCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.vallisCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.vallisCycle.id
          ){
            this.notify('奥布山谷时间', '奥布山谷即将进入温暖状态\n当前状态: ' + this.state.vallisCycle.toString());

            this.toast[i].id = this.state.vallisCycle.id;
          }
          break;
        case 'EarthCycle-day':
          if (this.state.earthCycle.type === '夜晚' &&
            (this.state.earthCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.earthCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.earthCycle.id
          ){
            this.notify('地球时间', '地球即将进入白天\n当前状态: ' + this.state.earthCycle.toString());

            this.toast[i].id = this.state.earthCycle.id;
          }
          break;
        case 'EarthCycle-night':
          if (this.state.earthCycle.type === '白天' &&
            (this.state.earthCycle.timeEnd - Date.now()) <= this.toast[i].timeLeft * 1000 &&
            (this.state.earthCycle.timeEnd - Date.now()) > 0 &&
            this.toast[i].id != this.state.earthCycle.id
          ){
            this.notify('地球时间', '地球即将进入夜晚\n当前状态: ' + this.state.earthCycle.toString());

            this.toast[i].id = this.state.earthCycle.id;
          }
          break;
      }
    }
  }
}

module.exports = {
  toast: new Toast()
}
