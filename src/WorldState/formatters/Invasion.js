class Invasion{
  constructor(){
    this.invasion = [];
  }

  update(){
    var worldState = require('../WorldState').WorldState;

    this.invasion = [];
    var temp = {};
    if (worldState.rowData.Invasions != undefined){
      for (var i in worldState.rowData.Invasions){
        if (worldState.rowData.Invasions[i].Completed === true){
          continue;
        }
        
        var vsInfestation = /infest/i.test(worldState.rowData.Invasions[i].DefenderMissionInfo.faction);

        var attackerReward = [];
        var temp = {};
        if (worldState.rowData.Invasions[i].AttackerReward.countedItems){
          for (var j in worldState.rowData.Invasions[i].AttackerReward.countedItems){
            temp = {
              item: worldState.translateReward(worldState.rowData.Invasions[i].AttackerReward.countedItems[j].ItemType),
              count: worldState.rowData.Invasions[i].AttackerReward.countedItems[j].ItemCount,
            }
            attackerReward.push(temp);
          }
        }

        var defenderReward = [];

        if (worldState.rowData.Invasions[i].DefenderReward.countedItems){
          for (var j in worldState.rowData.Invasions[i].DefenderReward.countedItems){
            temp = {
              item: worldState.translateReward(worldState.rowData.Invasions[i].DefenderReward.countedItems[j].ItemType),
              count: worldState.rowData.Invasions[i].DefenderReward.countedItems[j].ItemCount,
            }
            defenderReward.push(temp);
          }
        }

        temp = {
          location: worldState.translateSolNode(worldState.rowData.Invasions[i].Node),
          percent: (1 + (worldState.rowData.Invasions[i].Count / worldState.rowData.Invasions[i].Goal)) * (vsInfestation ? 100 : 50),
          attackerReward: attackerReward,
          defenderReward: defenderReward,
        }
        this.invasion.push(temp);
      }
    }
  }
}

module.exports = {
  invasion: new Invasion()
}
