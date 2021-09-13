//1.引入express框架模块
var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

//2.创建web服务器
var app = express()

//3.初始化
app.use('/public', express.static('public'))      	//允许静态资源访问
app.engine('html', require('express-art-template')) //配置模板引擎
app.use(bodyParser.json());  						 //解析json格式数据
app.use(bodyParser.urlencoded({ extended: false })); //解析文本格式数据
//4.路由
//学生列表-视图
app.get('/stu', function(req, res){
	//使用fs模块的readFile方法获取数据
	fs.readFile('./db.json', function(err, data){
		if (err) res.end('404 Not Found')
		//1.获取旧数据
		//data.toString().stus 脚下留心：是一个字符串 举例：var str = "{name:'z3',age:18}"
		//解决：将字符串强制转化为对象
		var stus = JSON.parse(data.toString()).stus
		console.log(stus);
		//2.加载视图并传递数据
		res.render('index.html', {
			stus: stus
		}) 
	})
})

//学生添加-视图
app.get('/stu/create', function(req, res){
	//加载视图
	res.render('post.html')
})
//学生添加-数据处理
app.post('/stu/create', function(req, res){
	//1.获取表单提交的数据（脚下留心：必须先引入模块，再配置才可以使用）
	// console.log(req.body)  { name: 'aaaa', pwd: 'aaaa', age: '111', sex: '男' }
	var postData = req.body
	//2.入库
	fs.readFile('./db.json', function(err, data){
		if (err) res.end('404 Not Found')
		//2.1先获取旧数据，结果是数组里面是一个个对象  
		var stus = JSON.parse(data.toString()).stus  //stus现在是一个数组，数组中是一个个对象
		//2.2将表单提交的数据压入到旧数据中
		var d = new Date();
		var date = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+
	         d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds()
	    //明确：id自增
	    //问：如何获取呢
	    //答：db.json 最大的ID + 1
	    //1.获取数据的最大下标 		  stus.length - 1
	    //2.通过下标获取id最大的对象  stus[stus.length - 1]
	    //3.最大的id + 1  等于  新数据的id
		postData.id = stus[stus.length - 1].id + 1   
		postData.create_at = date   //给postData对象增加create_at属性
		stus.push(postData)         //将postData数据压入到stus中
		//2.3重新写入文件
		//脚下留心：调用writeFile方法只能写字符串，而stus是数组，数组里面是一个个对象
		//解决？ 通过
		var fileData = JSON.stringify({stus: stus})  //{stus: [对象,....,对象]}
		fs.writeFile('./db.json', fileData, function(err){
			if (err) res.end('404 Not Found')
			//3.跳转
			res.redirect('/stu')
		})
	})
})

app.get('/stu/delete/:id', function(req, res){
	//学生删除
	//1.获取地址栏数据
	var id = req.params.id;
	//2.操作数据库
	fs.readFile('./db.json', function (err, data) {
		if (err) res.end('404 Not Find.');
		//获取旧数据
		var stus = JSON.parse(data.toString()).stus
	    //删除数据，
	    //语法：数组.findIndex（回调函数）   根据条件找数据下标
	    //语法：数组.splice(起始下标, 个数)  从数组中删除数据
	    var deleteId = stus.findIndex(function (item) {
	    	return item.id == id
	    }) 
	    stus.splice(deleteId, 1)
	    //3.入库，转化为字符串
	    var fileData = JSON.stringify({stus: stus})
	    fs.writeFile('./db.json', fileData, function (err) {
	        if (err) res.end('404 Not Find.');
	        //跳转
		    res.redirect('/stu')
	    })
	})
})
app.get('/stu/edit/:id', function(req, res){
	//学生修改-视图
	//获取参数
	var id = req.params.id;
	//获取数据
	fs.readFile('./db.json', function (err, data) {
		if (err) res.end('404 Not Find.');
		//数据过滤（字符串转化为数组）
		var stus = JSON.parse(data.toString()).stus
	    //语法：数组.findIndex（回调函数）   根据条件找数据
	    var stu = stus.find(function(item){
	    	return item.id == id
	    })
		//加载视图并传递数据
		return res.render('edit.html', {
			stu: stu
		}) 
	})
})
app.post('/stu/edit', function(req, res){
    var d = new Date();
    var date = d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()+' '+
               d.getHours()+'-'+d.getMinutes()+'-'+d.getSeconds();
	//学生添加-数据处理
	//1.获取表单提交数据（req.body）
	var stu = req.body;
	//2.获取数据库db.json数据（组装）
	fs.readFile('./db.json', function (err, data) {
		if (err) res.end('404 Not Find.');
		//获取旧数据
		var stus = JSON.parse(data.toString()).stus
	    //更新旧数据
	    var updateId = stus.findIndex(function (item) {
	    	return item.id == stu.id
	    }) 
	    stu.create_at = date;
	    stus[updateId] = stu
	    //3.入库（转化为字符串）
	    var fileData = JSON.stringify({stus: stus })
	    fs.writeFile('./db.json', fileData, function (err) {
	        if (err) res.end('404 Not Find.');
	        //跳转
		    res.redirect('/stu')
	    })
	})
})

//5.启动服务
app.listen(8080, function(){
	console.log('running')
})