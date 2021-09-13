var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin888',
  database : 'nodejs'
});
 
connection.connect();
 
 
connection.query("insert into stu values (null, 'a', 18, '男', default)", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();