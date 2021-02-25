import React, { Component } from 'react';
import { Card } from 'antd';
import {timeFormat} from '../../../Utils.js';

const gridStyle = {
  padding: 0,
  width: 'calc(50% - 45px)',
  height: 150,
  marginLeft: 30,
  marginTop: 20,
};

const cardStyle = {
  width: '100%',
  height: 150
}

class TimeCycle extends Component{
  constructor(){
    super();
    var worldState = window.require('electron').remote.getGlobal('WorldState').state;
    this.cetus = worldState.cetusCycle;
    this.earth = worldState.earthCycle;
    this.cambion = worldState.cambionCycle;
    this.vallis = worldState.vallisCycle;
    this.interval = null;

    this.state = {
      cetusType: this.cetus.type,
      cetusTimeLeft: timeFormat((this.cetus.timeEnd - Date.now()) / 1000),
      earthType: this.earth.type,
      earthTimeLeft: timeFormat((this.earth.timeEnd - Date.now()) / 1000),
      cambionType: this.cambion.type,
      cambionTimeLeft: timeFormat((this.cambion.timeEnd - Date.now()) / 1000),
      vallisType: this.vallis.type,
      vallisTimeLeft: timeFormat((this.vallis.timeEnd - Date.now()) / 1000),
    };

    clearInterval(this.interval);
    this.interval = setInterval(this.update.bind(this), 1000);
  }

  update = ()=>{
    this.cetusCycle();
    this.earthCycle();
    this.cambionCycle();
    this.vallisCycle();
  }

  cetusCycle(){
    this.setState({
      cetusType: this.cetus.type,
      cetusTimeLeft: timeFormat((this.cetus.timeEnd - Date.now()) / 1000),
    });
  }

  earthCycle(){
    this.setState({
      earthType: this.earth.type,
      earthTimeLeft: timeFormat((this.earth.timeEnd - Date.now()) / 1000),
    });
  }

  cambionCycle(){
    this.setState({
      cambionType: this.cambion.type,
      cambionTimeLeft: timeFormat((this.cambion.timeEnd - Date.now()) / 1000),
    });
  }

  vallisCycle(){
    this.setState({
      vallisType: this.vallis.type,
      vallisTimeLeft: timeFormat((this.vallis.timeEnd - Date.now()) / 1000),
    });
  }

  render(){
    return (
      <div>
        <Card.Grid style={gridStyle}>
          <Card title="希图斯时间" bordered={false} style={cardStyle}>
            <p>
              {this.state.cetusType}, {this.state.cetusTimeLeft}
            </p>
          </Card>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Card title="奥布山谷时间" bordered={false} style={cardStyle}>
            <p>
              {this.state.vallisType}, {this.state.vallisTimeLeft}
            </p>
          </Card>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Card title="魔胎之境时间" bordered={false} style={cardStyle}>
            <p>
              {this.state.cambionType}, {this.state.cambionTimeLeft}
            </p>
          </Card>
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <Card title="地球时间" bordered={false} style={cardStyle}>
            <p>
              {this.state.earthType}, {this.state.earthTimeLeft}
            </p>
          </Card>
        </Card.Grid>
      </div>
    )
  }
}

export default TimeCycle;
