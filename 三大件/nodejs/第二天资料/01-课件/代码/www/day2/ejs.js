//1.引入第三方模块EJS
var ejs = require('ejs');

//2.调用render方法，将字符串替换成HTML
var html = '<h1><%= username %></h1>';
var result = ejs.render(html, {username: '张三'});
console.log(result);

//2.调用renderFile方法，将字符串替换成HTML
// ejs.renderFile('./ejs.html', {
// 		username: '传智播客',
// 		age: 5,
// 		orders: [
// 			{id:1, title: '标题1', price: 30},
// 			{id:2, title: '标题2', price: 33},
// 			{id:3, title: '标题3', price: 12},
// 		], 
// 	}, 
// 	function(err, str) {
		
// 		if (err) {
// 			console.log(err)
// 			return
// 		}
// 		console.log(str);
// });