import React from 'react';
import ReactDOM from 'react-dom';
import './clock.css';
import {timeFormat} from '../../Utils.js';

class Clock extends React.Component {
  constructor(){
    super();
    var worldState = window.require('electron').remote.getGlobal('WorldState').state;
    this.cetus = worldState.cetusCycle;

    this.state = {
      cetusType: this.cetus.type,
      cetusTimeLeft: timeFormat((this.cetus.timeEnd - Date.now()) / 1000),
    };
    setInterval(this.update.bind(this), 1000);
  }

  update(){
    this.setState({
      cetusType: this.cetus.type,
      cetusTimeLeft: timeFormat((this.cetus.timeEnd - Date.now()) / 1000),
    });
  }

  render(){
    return (
      <div>
        <div className="state">
          {this.state.cetusType}
        </div>
        <div className="timeer">
          剩余: {this.state.cetusTimeLeft}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
