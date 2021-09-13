var express = require('express');
var fs = require('fs');
var md5 = require('md5');
var session = require('express-session')
var router = express.Router();

//导入数据模型
var StuModel = require('../models/stu')
//配置session
router.use(session({
  secret: 'itcast',	  	  	//加密存储
  resave: false,		    //客户端并行请求是否覆盖:true-是,false-否
  saveUninitialized: true   //初始化session存储
}))

//判断是否非法访问
router.use(function(req, res, next){
	//获取用户当前请求的地址
	var currentUrl = req.url
	//如果用户访问的
	//不是登录页 && 也不是注册页   检测身份  其他则不管
	if (currentUrl != '/login' && currentUrl != 'reg') {
		if (!req.session.isLogin) return res.redirect('/login')
	}
	//其他情况（正常继续向下匹配）
	next()
}) 

//退出功能
router.get('/logout', function(req, res){
	//1.清楚session
	req.session.isLogin = null
	req.session.userinfo = null
	//2.跳转登录页
	res.redirect('/login')
})
//注册静态页面
router.get('/reg', function(req, res){
	//加载视图
	return res.render('register.html')
})
//注册静态页面-数据处理
router.post('/reg', function(req, res){
	//1.获取数据
	var postData = req.body
	//2.检测用户是否存在
		//2.1获取文件数据
		var fileData = fs.readFileSync('./db.json', 'utf8')
		var stus = JSON.parse(fileData).stus
		//2.2判断数据是否存在
		var stu = stus.find(function(item){
			return item.name == postData.name
		})
		if (stu) return res.status(200).json({status: 1, msg: "用户已存在"})
	//3.写入数据（注：写文件必须获取全部数据，否则覆盖）
		//3.1组装单条数据
	    var d = new Date();
	    var date = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+
	               d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
	    postData.id = stus[stus.length - 1].id + 1 // 添加 id ，唯一不重复
	    postData.create_at = date
	    postData.pwd = md5(postData.pwd)
		//3.2压入
	    stus.push(postData)
		//3.3组装写入格式{stus: 数组}
		var writeData = JSON.stringify({stus:stus})
		fs.writeFile('./db.json', writeData, function(err){
		//3.4判断
			if (err) return res.status(200).json({status: 1, msg: "写入失败"})
			return res.status(200).json({status: 0, msg: "注册成功"})
		}) 
})
//登录静态页面
router.get('/login', function(req, res){
	//加载视图
	return res.render('login.html')
})
//登录数据处理
router.post('/login', function(req, res){
	//1.接受数据
	var postData = req.body
	//2.检测用户是否存在&密码是否正确
		//2.1获取文件数据
		var fileData = fs.readFileSync('./db.json', 'utf8')
		var stus = JSON.parse(fileData).stus
		//2.2根据用户名查找用户
		var stu = stus.find(function(item){
			return item.name == postData.name
		})
		//2.3判断用户是否存在
		if (!stu) return res.status(200).json({status: 1, msg: '用户不存在'})
		//2.4判断密码是否正确
		if (stu.pwd !== md5(postData.pwd)) return res.status(200).json({status: 1, msg: '密码错误'})
		 
	//3.响应结果（登录成功）
	req.session.isLogin = true
	req.session.userinfo = stu
	return res.status(200).json({status: 0, msg: '登录成功'})
})

module.exports = router;