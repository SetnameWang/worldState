const timeFormater = require('../../Utils.js').timeFormat;

//地球
class EarthCycle{
  constructor(){
    this.timeEnd = 0;
    this.type = '';
    this.id = '';
  }

  update(){
    var now = Date.now();
    var cycleSeconds = Math.floor(now / 1000) % 28800; // One cycle = 8 hours = 28800 seconds

    var dayTime = cycleSeconds < 14400;


    this.type = dayTime ? '白天' : '夜晚';

    this.timeEnd = dayTime ? Math.floor(now / 28800000) * 28800000 + 14400000 : Math.floor(now / 28800000) * 28800000 + 28800000;
    this.id = this.timeEnd.toString();
  }

  toString(){
    var timeLeft = (this.timeEnd - Date.now()) / 1000;

    return this.type + ', 剩余时间: ' + timeFormater(timeLeft);
  }
}


module.exports = {
  earthCycle: new EarthCycle(),
}
