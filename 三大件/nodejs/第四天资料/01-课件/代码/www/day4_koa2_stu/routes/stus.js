const router = require('koa-router')()

router.prefix('/stu')

const stuModel = require('../models/stu')
//显示列表页
router.get('/',  async function (ctx, next) {
	//1.获取数据
	var data = await stuModel.mysql("select * from stu")
	// ctx.body = 'this is stu list page'
	await ctx.render('index', {
		stus: data
	});
})
//显示添加页
router.get('/create', function (ctx, next) {
  //ctx.body = 'this is stu create page'
  //加载视图
  ctx.render('post');
})

router.get('/docreate', async function (ctx, next) {
  // ctx.body = 'this is stu docreate'
  // 1.接受数据
  // { name: 'adfdsf', pwd: 'adsfasdfa', age: 'dsfasdf', sex: '女' }
  // console.log(ctx.query)
  var getData = ctx.query
  // 2.过滤
  // 3.入库
  var data = await stuModel.mysql(`insert into stu
	values
	(null, '${getData.name}', ${getData.age}, '${getData.sex}', default)`)
  // 4.判断跳转
  ctx.response.redirect('/stu')
})

module.exports = router
