//1.引入http对象
const http = require('http')

//2.发送请求
http.get('http://bbs.itheima.com/forum-401-1.html', function(req,res){
	//获取HTML数据
	var html = ''
	//拼接数据
	req.on('data', function(data){
		html += data
	})
	//监听数据结束
	req.on('end', function(){
		// console.log(html)
		getTittle(html)
	})

})

function getTittle(html) {
	//1.引入模块
	const cheerio = require('cheerio')
	//2.将获取的HTML代码装载到$对象中
	const $ = cheerio.load(html, {decodeEntities: false})
	//3.匹配数据
	// console.log($('.xst'))
	$('.xst').each(function(index, item) {
		console.log($(item).html())
	})
}