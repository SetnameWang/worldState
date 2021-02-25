//const { net } = require('electron');

const fetch = require('electron-fetch').default;

const url = 'https://content.warframe.com/dynamic/worldState.php';

const timeInterval = 60;

const languages = require('./Data/languages.json');
const solNode = require('./Data/solNodes.json');

class WorldState{
  constructor(){
    this.rowData = {};
    this.state = {
      cetusCycle: require('./formatters/CetusCycle.js').cetusCycle,
      earthCycle: require('./formatters/EarthCycle.js').earthCycle,
      cambionCycle: require('./formatters/CambionCycle.js').cambionCycle,
      vallisCycle: require('./formatters/VallisCycle.js').vallisCycle,
      invasion: require('./formatters/Invasion.js').invasion,
    };
    this.interval = null;
  }

  translateReward(key){
    return languages[key.toLowerCase()].value;
  }

  translateSolNode(key){
    return solNode[key];
  }

  startUpdate(){
    this.update();
    this.interval = setInterval(this.update.bind(this), timeInterval * 1000);
  }

  stopUpdate(){
    clearInterval(this.interval);
  }

  update(){
    fetch(url).then(function(response) {
      return response.json();
    })
    .then((res)=>{
      this.rowData = res;
      this.formatData();
    });
  }

  formatData(){
    for (var i in this.state){
      this.state[i].update();
    }
    /*
    this.state.cetusCycle.update();
    this.state.earthCycle.update();
    this.state.cambionCycle.update();
    this.state.vallisCycle.update();
    */
  }
}

module.exports = {
  WorldState: new WorldState()
}
