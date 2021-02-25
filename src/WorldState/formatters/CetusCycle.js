const night = 3000000;
const timeFormater = require('../../Utils.js').timeFormat;

//希图斯
class CetusCycle{
  constructor(){
    this.timeEnd = 0;
    this.type = '';
    this.id = '';
  }

  update(){
    var worldState = require('../WorldState').WorldState;
    var missions = worldState.rowData.SyndicateMissions.filter(missions => missions.Tag == 'CetusSyndicate')
    if (missions.length > 0){
      var mission = missions[0];
      this.id = mission._id.$oid;

      var current = Date.now();
      var syndicateEnd = mission.Expiry.$date.$numberLong;

      var timeToNext = syndicateEnd - current;

      if (timeToNext < 0){
        return;
      }

      if (timeToNext > night){
        this.type = '白天'
        this.timeEnd = syndicateEnd - night;
      }else{
        this.type = '夜晚'
        this.timeEnd = syndicateEnd;
      }
    }
  }

  toString(){
    var timeLeft = (this.timeEnd - Date.now()) / 1000;

    return '' + this.type + ', 剩余时间: ' + timeFormater(timeLeft);
  }
}

module.exports = {
  cetusCycle: new CetusCycle(),
}
