//1.引入模块
var minexpress = require('./core/minexpress');
//2.创建app对象
var app = minexpress();
//3.路由
var testRouter = require('./routes/test');
testRouter(app)
//4.启动服务
app.listen(9090, function(){
    console.log('启动成功，访问：http://localhost:9090')
})