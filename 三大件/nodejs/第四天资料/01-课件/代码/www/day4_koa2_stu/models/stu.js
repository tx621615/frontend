//1.引用mysql模块
var mysql      = require('mysql');
//2.创建连接账号
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin888',
  database : 'nodejs'
});
 //3.连接
connection.connect();
//  //4.发送SQL语句
// connection.query("update stu set name = 'bb' where id = 6", function (error, results, fields) {
//   if (error) throw error; //JS语法抛出异常
//   console.log('The solution is: ', results);
// });

exports.mysql = (sql) => {
  var promise = new Promise(function(resolve, reject){
  	connection.query(sql, function (error, results, fields) {
  	  if (error) reject(error) ; ////数据处理出错
  	  resolve(results); //数据处理完成
  	});
  });
  return promise;
}