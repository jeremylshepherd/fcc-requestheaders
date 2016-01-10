var express = require('express');
var router = express.Router();

function softwareData(str){
    var data = str.split(' ');
    var arr = [];

    for(var i = 0; i < data.length; i++){
        if(data[i][0] === '(' && arr.length < 2){
            arr.push(i);
        }else if(data[i][data[i].length - 1] === ')' && arr.length < 2){
            arr.push(i + 1);
        }
    }

    var jData = data.slice(arr[0], arr[1]).join(' ');
    jData = jData.split('');
    jData.pop();
    jData.shift();
    jData = jData.join('');

    return jData;
}

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/api/whoami', function(req, res, next) {
  var language = req.headers['accept-language'];
  var software = softwareData(req.headers['user-agent']);
  var ipaddress = req.ip;
  var accept = language.split(',');
  accept = accept[0];
  var obj = {};
  obj.ipaddress = ipaddress;
  obj.language = accept;
  obj.software = software;
  //var obj = req.headers;
  res.json(obj);
});

router.get('/api/ip', function(req, res, next) {
  var ipaddress = req.ip;
  var obj = {};
  obj.ipaddress = ipaddress;
  obj.ips = req.ips;
  res.json(obj);
});

module.exports = router;
