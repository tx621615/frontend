//1.引入express模块
var express = require('express')
//2.创建app对象
var app = express()
//3.配置
//4.路由
app.use('/', function(req, res, next){
	console.log(1)
	next()
})
app.use('/', function(req, res, next){
	console.log(2)
	next()
})
app.get('/stu', function(req, res){
	console.log('stu list');
	res.send('stu list') //end send render
})
app.get('/stu/create', function(req, res){
	console.log('stu add');
	res.send('stu add') //end send render
})
//5.启动服务
app.listen(8080, function(){
	console.log('启动成功...')
})