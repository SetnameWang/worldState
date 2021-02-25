import React, { Component } from 'react';
import { Card } from 'antd';
import './Invasion.css';


class Invasion extends Component{
  constructor(){
    super();
    var worldState = window.require('electron').remote.getGlobal('WorldState').state;
    this.invasions = worldState.invasion.invasion;
  }

  update(){
    var temp;
    var output = [];
    var attackerTemp;
    var defenderTemp;
    for (var i in this.invasions){
      attackerTemp = '';
      defenderTemp = '';

      if (this.invasions[i].attackerReward.length > 0){
        for (var j in this.invasions[i].attackerReward){
          attackerTemp += this.invasions[i].attackerReward[j].item;
          if (this.invasions[i].attackerReward[j].count > 1){
            attackerTemp += ' x' + this.invasions[i].attackerReward[j].count.toString()
          }
        }
      }

      if (this.invasions[i].defenderReward.length > 0){
        for (j in this.invasions[i].defenderReward){
          defenderTemp += this.invasions[i].defenderReward[j].item;
          if (this.invasions[i].defenderReward[j].count > 1){
            defenderTemp += ' x' + this.invasions[i].defenderReward[j].count.toString()
          }
        }
      }

      temp = (
        <Card.Grid size="small" style={{ width: '50%' }} key={i}>
          <p>{this.invasions[i].location.value}</p>
          <div className="reward">
            <div className="rewardLeft">{attackerTemp}</div>
            <div className="rewardRight">{defenderTemp}</div>
          </div>
          <div className="progressBar"><div className="progressBarInner" style={{width: this.invasions[i].percent + '%'}}></div></div>
        </Card.Grid>
      )
      output.push(temp);
    }
    return output;
  }

  render(){
    return (
      <div>{this.update()}</div>
    )
  }
}

export default Invasion;
