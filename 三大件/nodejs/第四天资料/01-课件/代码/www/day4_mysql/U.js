var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin888',
  database : 'nodejs'
});
 
connection.connect();
 
 
connection.query("update stu set name = 'kao ni qinwa' where id = 1", function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
 
connection.end();