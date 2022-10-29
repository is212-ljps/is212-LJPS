var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
require('dotenv').config({path:__dirname+'/../../../.env.local'})
var myCon = mysql.createConnection({
  host: process.env.host,
  user: process.env.username,
  password: process.env.password
});
var rl = readline.createInterface({
  input: fs.createReadStream(__dirname + '/ljps_sql_setup_test.sql'),
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
