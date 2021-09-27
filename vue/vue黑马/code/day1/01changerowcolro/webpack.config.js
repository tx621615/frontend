const pathm = require('path')

// 1.导入HTML插件
const HtmlPlugin = require('html-webpack-plugin')
// 2.创建HTML插件的实例对象,把index.html文件复制到根目录，这样一进入根目录就可以展示了
// 除了复制index.js还会帮忙注入一个bundle.js
const htmlPlugin = new HtmlPlugin({
    template: "./src/index.html", //指定源文件的内容
    filename: "./index.html"  //指定生成的文件的存放路径
})

// 1.清除模块，类似maven:clean功能，引入clean模块的构造函数
// {}表示解构赋值，相当于require返回的对象中有一个CleanWebpackPlugin属性
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log(require('clean-webpack-plugin'));
// 2.创建一个对象然后加入plugin里面,也可以直接再plugin里面创建
const cleanPlugin = new CleanWebpackPlugin();

module.exports = {
    // 在开发调试阶段，建议大家把devtool如下设置，可以生成源代码和目标代码相应行号的对应关系
    // 这样出现错误的时候不会定位到目标代码的行号，而是定位到源代码的行号
    // 注意生产环境下需要关闭这个选项
    // devtool:"eval-source-map",
    // 实际发布的时候，建议大家可以如下设置或者直接注释
    devtool:"nosources-source-map",
    mode: "development",
    entry: pathm.join(__dirname, "./src/index1.js"),
    output:{
        path: pathm.join(__dirname, "dist"),
        // 把js放到dist的js文件夹下
        filename: 'js/bundle.js'
    },
    plugins: [htmlPlugin, cleanPlugin],    //3.通过plugin节点使htmlPlugin插件生效，挂载到webpack上

    // 打完包后自动打开浏览器
    devServer:{
        open: true,
        host: "127.0.0.1",
        port: 8080
    },

    module: {  //所有第三方文件模块的匹配规则
        rules: [
            // 定义了不同模块对应的loader
            //  /    /表是正则
            // 前后顺序不能乱写
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            //处理.less文件的loader
            {test:/\.less$/, use:['style-loader', 'css-loader', 'less-loader']},
            // 处理图片文件的loader,实际需要使用file-loader，但是默认不需要添加
            // 设置limit,限制图片大小，单位字节，如果大于这个值就不会转为base64
            // 注意如果图片被解析成了base64字符串，则最终打包的时候不会把图片一并打包到dist文件夹下
            // outputPath,把图片打包后放到dist的image文件夹下
            {test:/\.jpg|png|gif$/, use:'url-loader?limit=470&outputPath=images'},
            // 使用babei-loader处理高级的js语法
            // exclude排除第三方包的js文件，node_modules的js已经适配了兼容性问题了
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    },
    resolve:{
        alias:{
            // 定义一个根路径，这是webpack如何解析@符号的对应，这样可以在js里面写这个根路径了
            '@': pathm.join(__dirname, './src/')
        }
    }
}