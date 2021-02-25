const timeFormater = require('../../Utils.js').timeFormat;

const lStart = new Date('November 10, 2018 08:13:48 UTC');
const loopTime = 1600000;
const warmTime = 400000;
const coldTime = loopTime - warmTime;

// 奥布山谷
class VallisCycle{
  constructor(){
    this.timeEnd = 0;
    this.type = '';
    this.id = '';
  }

  update(){
    var sinceLast = (Date.now() - lStart) % loopTime;
    var toNextFull = loopTime - sinceLast;
    var isCold = toNextFull < coldTime;
    this.type = isCold ? '寒冷' : '温暖';

    this.timeEnd = isCold ? Math.floor((Date.now() - lStart) / loopTime) * loopTime + loopTime : Math.floor((Date.now() - lStart) / loopTime) * loopTime + warmTime;
    this.timeEnd += lStart.getTime();
  }

  toString(){
    var timeLeft = (this.timeEnd - Date.now()) / 1000;

    return this.type + ', 剩余时间: ' + timeFormater(timeLeft);
  }
}


module.exports = {
  vallisCycle: new VallisCycle(),
}
