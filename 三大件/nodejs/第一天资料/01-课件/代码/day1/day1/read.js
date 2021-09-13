//1.引入fs模块
var fs = require('fs')
//2.练习：读取a.txt内容
fs.readFile('a.txt', function(err, data){
	if (err) {
		console.log(err)
		return;
	}

	console.log(data)  //脚下留心：默认不是我们可识别的内容
					   //Buffer对象
					   //通过 Buffer对象.toString() 转化为字符显示 
	console.log(data.toString()) 
})
//多学一招：前期读的时候就声明获取
fs.readFile('a.txt', 'utf8', function(err, data){
	if (err) {
		console.log(err)
		return;
	}
	console.log(data) 
})