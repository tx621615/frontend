// dirname	后去掉一层，接着返回,文件夹名字
// basename 取最后一层，返回文件名字
// path模块用来解析路径的
//1.引入内置模块
var path = require('path')
//2.练习
var testData = 'c:/app/view/godos/add.html';

console.log(path.basename(testData)) //add.html

testData = path.dirname(testData);
console.log(testData)  				 //c:/app/view/godos

console.log(path.basename(testData)) //godos
