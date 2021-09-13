//1.引入express模块
var express = require('express')
var session = require('express-session')
//2.创建app对象
var app = express()
//3.配置
app.use(session({
  secret: 'itcast',	  	  	//加密存储
  resave: false,		  	//客户端并行请求是否覆盖:true-是,false-否
  saveUninitialized: true  //初始化session存储
}))
//4.路由（需求：设置session数据a=1，b=2，c=3 最后删除c）
app.get('/set', function(req, res, next){
	req.session.a = 1
	req.session.b = 2
	req.session.c = 3
	res.send('设置成功，通过/get获取')
})
app.get('/get', function(req, res, next){
	console.log(req.session.a)
	console.log(req.session.b)
	console.log(req.session.c)
	res.send('获取成功，请通过控制台查看')
})
app.get('/del', function(req, res, next){
	req.session.c = null
	res.send('删除成功，请通过/get重新查看')
})
//5.启动服务
app.listen(8080, function(){
	console.log('启动成功...')
})