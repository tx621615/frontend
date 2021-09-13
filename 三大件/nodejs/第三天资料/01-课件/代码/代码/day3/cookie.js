//1.引入express模块
var express = require('express')
var cookieParser = require('cookie-parser')
//2.创建app对象
var app = express()
//3.配置
app.use(cookieParser('itcast'))   //如：md5('admin')  加盐  md5('admin' . $salt)
//4.路由（需求：设置cookie数据a=1永久，b=2（1分钟）c=3（加密）d=4（删除））
app.get('/set', function(req, res, next){
	// res.cookie(键, 值, {signed: 是否加密true-是,false-否默认,maxAge: 时间/毫秒})
	res.cookie('a', 1)
	res.cookie('b', 2, {maxAge: 60*1000})
	res.cookie('c', 3, {signed: true})
	res.cookie('d', 4)
	res.send('设置成功，通过/get获取')
})
app.get('/get', function(req, res, next){
	// 获取（未加密）：req.cookies
	// 获取（  加密）：req.signedCookies
	console.log(req.cookies.a)
	console.log(req.cookies.b)
	console.log(req.cookies.c)
	console.log(req.cookies.d)
	console.log(req.signedCookies.c)
	res.send('获取成功，请通过控制台查看')
})
app.get('/del', function(req, res, next){
	//清除：res.clearCookie(键)
	res.clearCookie('d')
	res.send('删除成功，请通过/get重新查看')
})
//5.启动服务
app.listen(8080, function(){
	console.log('启动成功...')
})