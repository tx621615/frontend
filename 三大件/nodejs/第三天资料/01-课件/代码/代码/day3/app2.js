//1.引入express模块
var express = require('express')
var fs = require('fs')
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
app.get('/stu', function(req, res, next){
	fs.readFile('./aaaa.txt', function(err, data){
		// if (err) res.send('server error')
		if (err) next(err)  //next不传递参数则匹配下一个URL
							//next传递err则匹配第一个含有err的中间件
		res.send(data) //end send render
	})
})
app.get('/stu/create', function(req, res){
	fs.readFile('./bbbb.txt', function(err, data){
		// if (err) res.send('server error')
		if (err) next(err)
		res.send(data) //end send render
	})
})
//中间件灵活使用（404）
//原理：代码是不是从上到下执行，到最后都没有则匹配404页面
//app.use(function(req, res){
app.use('/', function(req, res){
	res.send('404 Page')
})
//错误统一处理
//脚下留心：（形参可以不写，但是顺序不能改变）
app.use(function(err, req, res, next){
	res.send('网络异常，请稍后重试...')
})
//5.启动服务
app.listen(8080, function(){
	console.log('启动成功...')
})