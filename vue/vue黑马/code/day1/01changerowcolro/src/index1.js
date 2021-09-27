import $ from 'jquery'

// 这个文件是程序的入口，把其他文件导入这个文件，比如css文件
// 如果某个模块中，使用from接受到的成员为undefined,则没必要进行接收
// 下面两个接收之后就是undefined
// 导入的两个文件会被转成js文件形式进行渲染
import './css/index.css'
import './css/index.less'

// 1.导入图片，得到图片文件
import logo from './images/logo.jpg'
// 这个是base64的字符串,或者url.可以设置图片大小，如果大于某个大小就不是base64而是url

import '@/js/test/info.js'

console.log(logo)
// 2. 给img标签的src动态赋值
$('.box').attr('src', logo)
$(function(){
    $("li:odd").css("background-color", "red");
    $("li:even").css("background-color", "green");
})


// 定义装饰器函数
function info(target){
    target.info = 'Person info.'
}

// 定义一个普通的类
@info
class Person{}

console.log(Person.info)