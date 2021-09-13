module.exports = function(app) {
	//首页
	app.get('/',function(req,res){
	    //加载视图
	    res.render('index.html', {
	        username: '悟空',
	        age: 18
	    })
	})
	//登录视图
	app.get('/login',function(req,res){
	    //加载视图
	    res.render('login.html', {
	        username: '悟空',
	        age: 18
	    })
	})
	//登录视图-数据处理
	app.post('/dologin',function(req,res){
	    //获取post传过来的数据
	    console.log(req.body); 
	    //提示
	    res.send("<script>alert('登录成功，请查看控制台数据');history.back();</script>")
	})
}