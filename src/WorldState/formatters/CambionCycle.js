const timeFormater = require('../../Utils.js').timeFormat;

// 魔胎之境
class CambionCycle{
  constructor(){
    this.timeEnd = 0;
    this.type = '';
    this.id = '';
  }

  update(){
    var cetusCycle = require('../WorldState').WorldState.state.cetusCycle;
    this.type = cetusCycle.type ? 'FASS' : 'VOME';
    this.id = cetusCycle.id;
    this.timeEnd = cetusCycle.timeEnd;
  }

  toString(){
    var timeLeft = (this.timeEnd - Date.now()) / 1000;

    return '' + this.type + ', 剩余时间: ' + timeFormater(timeLeft);
  }
}

module.exports = {
  cambionCycle: new CambionCycle(),
}
