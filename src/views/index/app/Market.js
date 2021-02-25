import React, { Component } from 'react';
import { Select } from 'antd';
import { Table } from 'antd';
import { notification } from 'antd';

const options = require('./data/wm_items.json');

const request =  window.require('electron').remote.getGlobal('request');

const clipboard = window.require('electron').clipboard;

class Market extends Component{
  constructor(){
    super();
    this.state = {
      imgDisplay: 'none',
      imgSrc: '',
      orderList: [],
      currentItem: '',
      isTableLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.copy = this.copy.bind(this);

    this.tableTitle = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '白金',
        dataIndex: 'platinum',
        key: 'platinum',
        sorter: (a, b) => a.platinum - b.platinum,
        sortDirections: ['descend'],
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
        sortDirections: ['descend'],
      },
      {
        title: '状态',
        dataIndex: 'status',
        filters: [
          {
            text: '游戏中',
            value: '游戏中',
          },
          {
            text: '网站在线',
            value: '网站在线',
          },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        key: 'status',
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (e) =>
          this.state.orderList.length >= 1 ? (
            // eslint-disable-next-line
              <a onClick={() => this.copy(e)}>复制</a>
          ) : null,
      },
    ]
  }

  copy(e){
    var text = '/w ' + e.username + ' Hi! I want to buy: ' + this.state.currentItem+ ' for ' + e.platinum + ' platinum. (warframe.market)'
    clipboard.writeText(text);
    notification.info({
      message: `成功复制到剪贴板`,
      description:
        '进入游戏粘贴即可\n内容: ' + text,
      placement: 'bottomRight',
    });
  }

  handleChange(e){
    var option = options.filter((option)=>{
      return option.value === e;
    })[0];
    this.setState({
      isTableLoading: true,
    })
    if (option){
      this.setState({
        imgDisplay: 'block',
        imgSrc: 'https://warframe.market/static/assets/' + option.thumb,
        currentItem: option.en,
      })
      request('https://api.warframe.market/v1/items/' + option.url_name + '/orders', {}, (res)=>{
      console.log(res);
        var orderList = []
        var orders = res.payload.orders.filter((order)=>{
          return order.user.status !== 'offline' && order.order_type === 'sell';
        })
        orders = orders.sort((a, b) => a.platinum - b.platinum);
        for (var i in orders) {
          if (i > 100){
            break;
          }
          if (orders[i].platform !== 'pc' ){
            return;
          }
          var temp = {
            order_type: orders[i].order_type,
            username: orders[i].user.ingame_name,
            platinum: orders[i].platinum,
            quantity: orders[i].quantity,
            status: (orders[i].user.status === 'ingame') ? '游戏中' : '网站在线',
            id: orders[i].id
          }
          orderList.push(temp);
        }
        this.setState({
          orderList: orderList,
          isTableLoading: false,
        })
      })
    }
  }

  render(){
    return (
      <div>
        <div style={{position: 'fixed', top: '20', right: '10%', color: 'gray'}}>数据来自warframe.market</div>
        <Select
          showSearch
          style={{ width: '80%', margin: '10% 10% 3% 10%'}}
          placeholder="在此输入..."
          optionFilterProp="cn"
          allowClear={true}
          autoFocus
          onChange={this.handleChange}
          options={options}
          filterOption={(input, option) =>
            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.en.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        />
        <img alt="item" src={this.state.imgSrc} style={{display: this.state.imgDisplay, width: 50, height: 50, marginLeft: 'calc(50% - 25px)'}} />
        <Table
          dataSource={this.state.orderList}
          columns={this.tableTitle}
          pagination={{ pageSize: 20, showSizeChanger: false }}
          scroll={{ y: 190 }}
          loading={this.state.isTableLoading}
          rowKey='id' />
      </div>
    )
  }
}

export default Market;
