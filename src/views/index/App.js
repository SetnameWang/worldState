import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';

import TimeCycle from './app/TimeCycle.js';
import Invasion from './app/Invasion.js';
import Settings from './app/Settings.js';
import Market from './app/Market.js';

const { Sider } = Layout;

const electron = window.require('electron');

class App extends Component {
  constructor(){
    super();
    this.state = {
      worldSeed: '',
      collapsed: false,
      logoSrcs: [require('../../res/logo-long.png').default, require('../../res/logo-short.png').default],
      logoWidth: [168, 48],
      logoSelect: 0,
      tabs: [],
      currentTab: 0,
    }
    //this.getState();

    this.handleClick = this.handleClick.bind(this);
		this.onCollapse = this.onCollapse.bind(this);
		this.displayTab = this.displayTab.bind(this);
  }

  getState(){
    this.worldState = electron.remote.getGlobal('WorldState').state;
    console.log(this.worldState.rowData);
  }

  handleClick(e){
    this.setState({
      currentTab: parseInt(e.key)
    });
    this.displayTab();
  };

  onCollapse(collapsed){
    var select;
    if (this.state.logoSelect === 0){
      select = 1;
    }else{
      select = 0;
    }
    this.setState({
      collapsed: collapsed,
      logoSelect: select,
    });
  };

  closeWindow(){
    electron.remote.getCurrentWindow().close();
  }

  displayTab(){
    switch (this.state.currentTab) {
      case 0:
        return (<TimeCycle /  >)
      case 1:
        return (<Invasion /  >)
      case 3:
        return (<Market /  >)
      case 6:
        return (<Settings /  >)
      default:
        return (<TimeCycle /  >)
    }
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <div className="closeWindow" onClick={this.closeWindow}></div>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ minHeight: '100vh' }}>
          <img className="logo" alt="warframe wrrldstate" src={this.state.logoSrcs[this.state.logoSelect]} style={{width: this.state.logoWidth[this.state.logoSelect]}} />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} onClick={this.handleClick}>
            <Menu.Item key="0">时间</Menu.Item>
            <Menu.Item key="1">战区/入侵</Menu.Item>
            <Menu.Item key="2">其他</Menu.Item>
            <Menu.Item key="3">warframe.market</Menu.Item>
            <Menu.Item key="4">紫卡计算器</Menu.Item>
            <Menu.Item key="6">设置</Menu.Item>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          {this.displayTab()}
        </Layout>
      </Layout>
    );
  }
}

export default App;
