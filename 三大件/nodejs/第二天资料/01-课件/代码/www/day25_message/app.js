//创建留言数据对象
var msgs = [
  {name: '张三', content: "你好我是张三", create_at: '2017-11-14 10:30:32'},
  {name: '李四', content: "你好我是李四", create_at: '2017-11-15 10:11:14'},
  {name: '王五', content: "你好我是王五", create_at: '2017-11-16 10:22:55'}
];

//1.引入express框架
var url = require('url')
var moment = require('moment');
var express = require('express')
//2.创建app对象
var app = express()
//3.配置
app.engine('html', require('express-art-template'))
app.use('/public', express.static('public'))
//4.路由
//#留言列表
app.get('/', function(req, res){
	res.render('index.html', {
		msgs: msgs
	})
})
//#留言添加
app.get('/add', function(req, res){
	res.render('add.html')
})
//#留言添加处理
app.get('/doadd', function(req, res){
	//数据处理
	//1.接受参数
	var paramObj = url.parse(req.url, true).query
	//2.入库（压入）
	var date = moment().format("YYYY-MM-D h:mm:ss");
	var msg = {name:paramObj.name, content: paramObj.content, create_at: date}
	msgs.push(msg)
	//3.跳转
	res.redirect('/')
})
//5.启动服务
app.listen(8080, function(){
	console.log('启动成功，访问：http://localhost')
})