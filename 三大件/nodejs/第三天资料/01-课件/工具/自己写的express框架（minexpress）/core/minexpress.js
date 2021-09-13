//1.引入url模块
var http=require('http');
var url=require('url');
var art = require('art-template');
var querystring = require('querystring')
//2.暴露的模块
var Server = function()
{
    //全局变量
    var G = this;
    //处理get和post请求
    this._get = {};
    this._post = {};
    //创建APP对象
    var app = function(req,res)
    {
        //仿express封装render方法
        res.render=function(viewName, data){
            var html = art(process.cwd()+'/views/'+viewName, data)
            res.send(html)
        }
        //仿express封装send方法（end-乱码，send解决乱码）
        res.send=function(data){
            res.writeHeader(200, {"Content-Type":"text/html; charset=utf-8"});
            res.end(data);
        }
        //获取请求URL路径部分数据
        var pathname = url.parse(req.url).pathname;
        if(!pathname.endsWith('/')) pathname=pathname+'/';  //检测路径是否以“/”结尾
        //获取请求的方式（get or post）
        var method = req.method.toLowerCase();
        //全局注册
        if(G['_'+method][pathname])
        {
            if(method=='post')
            {
                var postStr='';
                req.on('data',function(chunk){
                    postStr+=chunk;
                })
                req.on('end',function(err,chunk) {
                    //组装post请求数据
                    postObj = querystring.parse(postStr); 
                    req.body = postObj;
                    //执行方法
                    G['_'+method][pathname](req,res); //执行全局的post执行方法
                })
            }else{
            //执行get请求
                G['_'+method][pathname](req,res); //执行全局的get方法
            }
        }else{
            //res.end('404 not found router');
            res.end(`Cannot ${method}  ${pathname}`); //仿Express提示
        }
    }
    //创建路由get方法，后期每写一个路由都会收集到G全局变量中
    app.get = function(string,callback){
        if(!string.endsWith('/')) string=string+'/';
        if(!string.startsWith('/')) string='/'+string;
        G._get[string]=callback;
    }
    //创建路由post方法，后期每写一个路由都会收集到G全局变量中
    app.post = function(string,callback){
        if(!string.endsWith('/')) string=string+'/';
        if(!string.startsWith('/')) string='/'+string;
        G._post[string]=callback;
    }
    //创建http服务器
    var server = http.createServer(app);
    //设置监听端口
    app.listen = function(port, callback = null){
        server.listen(port, callback)
    }
    //返回app对象
    return app;
}
//导出server供外部使用
module.exports=Server;