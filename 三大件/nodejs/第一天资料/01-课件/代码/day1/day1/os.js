//1.创建os对象（引入nodejs内置os模块）
var os = require("os");
//2.调用os对象方法获取系统数据
console.log('hello，'		 + os.EOL		    + 'itcast');
console.log('主机名: '		 + os.hostname());
console.log('操作系统名: ' 	 + os.type());
console.log('操作系统平台: ' + os.platform());
console.log('内存总量: ' 	 + os.totalmem() 	+ " 字节.");
console.log('空闲内存: ' 	 + os.freemem() 	+ " 字节.");