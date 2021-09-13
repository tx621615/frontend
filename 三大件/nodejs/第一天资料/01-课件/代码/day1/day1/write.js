//1.引入fs内置模块 files
var fs = require('fs')
//2.练习：通过write.js文件创建a.txt写入你好，传智

fs.writeFile('./a.txt', '你好,传智', function(err){
	//err  为null    成功
	//err不为null    有瑕疵
	if (err) {
		console.log(err)
		return;
	}
	console.log('success')
})
