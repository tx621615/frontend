//1.引入第三方模块 mime （需求：判断文件MIME类型）
var mime = require('mime')
//2.使用

var img = 'xxxx.png'
console.log(mime.getType(img));              // image/png  根据文件名获得mime类型
console.log(mime.getExtension('image/png')); // PNG,根据mime类型获得后缀名