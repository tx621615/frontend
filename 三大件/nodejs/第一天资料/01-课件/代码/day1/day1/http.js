//1.引入模块
var http = require('http')
//2.创建web服务器
var server = http.createServer()
//3.监听请求
server.on('request', function(req, res) {  //req - request 请求  res - response 响应
	console.log('收到用户请求,请求地址：'+req.url)

	//留心：有请求就必须有响应，没有响应网页无法打开
	res.write('hello，itcast')
	res.end();
})
//4.启动服务
server.listen(8080, function(){
	console.log('服务启动成功，访问：http://localhost:8080')
})