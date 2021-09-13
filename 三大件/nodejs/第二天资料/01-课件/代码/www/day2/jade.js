//1.引入第三方模块JADE
var jade = require('jade');

//2.调用render方法，将字符串替换成HTML
// var html = '<h1>#{uname} </h1>';
// var result = jade.render(html, {uname: '张三'});
// console.log(result);


//2.调用renderFile方法，将字符串替换成HTML
var html = jade.renderFile('jade.html', {
	username: '传智播客',
	age: 5,
	orders: [
		{id:1, title: '标题1', price: 30},
		{id:2, title: '标题2', price: 33},
		{id:3, title: '标题3', price: 12},
	], 
	pretty: true
})
console.log(html);