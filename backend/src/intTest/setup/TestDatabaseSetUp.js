var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
var database = require("../../../database/index");
var myCon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root'
});
var rl = readline.createInterface({
  input: fs.createReadStream('/Users/randallyeo/Desktop/Desktop Items/Y3/Y3S1/IS212 SPM/Project/is212-LJPS/backend/src/intTest/setup/ljps_sql_setup_test.sql'),
  terminal: false
  });
rl.on('line', async function(chunk){
  await myCon.query(chunk.toString('ascii'), function(err, sets, fields){
    if(err) console.log(err);
  });
});
var server;
rl.on('close', function(){
  myCon.end();
});
