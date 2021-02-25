import React from 'react';
import ReactDOM from 'react-dom';

class Notify extends React.Component {
  constructor(){
    super();
    var url = decodeURI(document.location.toString()).split('?')[1].split('&');
    this.body = []
    var temp;
    for (var i in url) {
      temp = url[i].split('=');
      this.body.push(<div>{temp[1]}</div>);
    }
    setInterval(this.destroy, 5000);
  }

  destroy(){
    window.require('electron').remote.getCurrentWindow().close();
  }

  render(){
    return (
      <div className="nodify">
        {this.body}
      </div>
    )
  }
}

ReactDOM.render(
  <Notify />,
  document.getElementById('root')
);
