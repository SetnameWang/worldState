const fetch = require('electron-fetch').default;

/*
{
	method: 'POST',
	body:    JSON.stringify(body),
	headers: { 'Content-Type': 'application/json' },
}
*/
function request(url, json, callback){
  fetch(url, json).then(function(response) {
    return response.json();
  })
  .then((res)=>{
    callback(res);
  });
}

module.exports = {
  request: request
}
