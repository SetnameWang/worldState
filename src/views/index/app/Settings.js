import React, { Component } from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import { Select } from 'antd';
import { Space } from 'antd';
import { InputNumber } from 'antd';
import {timeFormat} from '../../../Utils.js';

const { Option, OptGroup } = Select;

const electron = window.require('electron');

const gridStyle = {
  width: '50%',
  textAlign: 'center',
    position: 'relative',
}

const deleteStyle = {
  position: 'absolute',
  top: 'calc(50% - 15px)',
  right: '0px',
}

class Settings extends Component{
  constructor(){
    super()
    this.settings = electron.remote.getGlobal('settings');
    this.state = {
      option: '',
      timeInterval: 600,
    }

    this.onChange = this.onChange.bind(this);
    this.numOnChange = this.numOnChange.bind(this);
    this.addToast = this.addToast.bind(this);
    this.delToast = this.delToast.bind(this);
  }

  onChange(value){
    this.setState({option: value})
    if (value !== 'item'){
      this.displayOptions();
    }
  }

  numOnChange(value){
    this.setState({timeInterval: value})
  }

  addToast(){
    if (this.state.option === ''){
      return;
    }
    if (this.state.option !== 'item'){
      console.log(this.settings.settings.toast);
      this.settings.addToast({
        type: this.state.option,
        item: '',
        timeLeft: this.state.timeInterval,
      })
      this.forceUpdate();
    }
  }

  delToast(e){
    var index = parseInt(e.currentTarget.id);
    var temp = [];
    for (var i in this.settings.settings.toast){
      // eslint-disable-next-line
      if (i != index){
        temp.push(this.settings.settings.toast[i])
      }
    }
    this.settings.updateToast(temp);
    this.forceUpdate();
  }

  displayOptions(){
    if (this.state.option !== 'item'){
      return (
        <div>
          前
          <InputNumber min={1} max={6000} defaultValue={this.state.timeInterval} onChange={this.numOnChange} style={{margin: '0px 10px'}} />
          秒
        </div>
      )
    }else{
      return (<div>null</div>)
    }
  }

  toastList(){
    var output = [];
    var temp;
    for (var i in this.settings.settings.toast){
      var del = <Button danger style={deleteStyle} id={i} onClick={this.delToast}>删除</Button>
      switch (this.settings.settings.toast[i].type) {
        case 'CetusCycle-day':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>希图斯-白天</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        case 'CetusCycle-night':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>希图斯-夜晚</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        case 'VallisCycle-cold':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>奥布山谷-寒冷</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        case 'VallisCycle-warm':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>奥布山谷-温暖</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        case 'EarthCycle-day':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>地球-白天</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        case 'EarthCycle-night':
          temp = (
            <Card.Grid style={gridStyle} key={i}>
              <p>地球-夜晚</p>
              <p>{timeFormat(this.settings.settings.toast[i].timeLeft)}</p>
              {del}
            </Card.Grid>
          )
          break;
        default:
          temp = null;
          break;
      }
      if (temp){
        output.push(temp);
      }
    }
    return output;
  }

  render(){
    return (
      <div>
        <Card title="通知列表">
          {this.toastList()}
        </Card>
        <Space>
          添加提醒
          <Select style={{ width: 200 }} onChange={this.onChange}>
            <OptGroup label="希图斯">
            <Option value="CetusCycle-day">白天</Option>
              <Option value="CetusCycle-night">夜晚</Option>
            </OptGroup>
            <OptGroup label="奥布山谷">
              <Option value="VallisCycle-cold">寒冷</Option>
              <Option value="VallisCycle-warm">温暖</Option>
            </OptGroup>
            <OptGroup label="地球">
            <Option value="EarthCycle-day">白天</Option>
              <Option value="EarthCycle-night">夜晚</Option>
            </OptGroup>
            <OptGroup label="物品出现提醒">
              <Option value="item" disabled>物品</Option>
            </OptGroup>
          </Select>
          {this.displayOptions()}
          <Button type="primary" onClick={this.addToast}>添加</Button>
        </Space>
      </div>
    )
  }
}

export default Settings;
