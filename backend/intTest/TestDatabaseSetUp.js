var mysql = require('mysql');
var fs = require('fs');
var readline = require('readline');
var myCon = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'yeotwig1999'
});
var rl = readline.createInterface({
  input: fs.createReadStream('./ljps_sql_setup_test.sql'),
  terminal: false
 });
rl.on('line', function(chunk){
  myCon.query(chunk.toString('ascii'), function(err, sets, fields){
    console.log("HIIIIIIII")
    if(err) console.log(err);
  });
});
rl.on('close', function(){
  console.log("finished");
  myCon.end();
});