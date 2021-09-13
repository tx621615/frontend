//1.引入第三方模块ART
var art = require('art-template');

//2.调用render方法，将字符串替换成HTML
var html = '<h1>{{username}}</h1>';
var result = art.render(html, {username: '张三'});
console.log(result);


//2.调用art（同renderFile），将字符串替换成HTML
// var html = art(__dirname + '/art.html', {
// 	username: '传智播客',
// 	age: 5,
// 	orders: [
// 		{id:1, title: '标题1', price: 30},
// 		{id:2, title: '标题2', price: 33},
// 		{id:3, title: '标题3', price: 12},
// 	], 
// });
// console.log(html);