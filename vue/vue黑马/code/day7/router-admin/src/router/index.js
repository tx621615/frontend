import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/MyLogin.vue"
import Home from "@/components/MyHome.vue"
import Users from "@/components/menus/MyUsers.vue"
import Rights from "@/components/menus/MyRights.vue"
import Goods from "@/components/menus/MyGoods.vue"
import Orders from "@/components/menus/MyOrders.vue"
import Settings from "@/components/menus/MySettings.vue"
import UserDetail from "@/components/user/MyUserDetail.vue"
import PathArr from "@/router/paths.js"
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/home', component: Home, children: [
      {path: 'users', component: Users},
      {path: 'rights', component: Rights},
      {path: 'goods', component: Goods},
      {path: 'orders', component: Orders},
      {path: 'settings', component: Settings},
      {path: 'userinfo/:id', component: UserDetail, props:true}
    ], redirect: '/home/users'}
  ]

})

router.beforeEach(function(to,from,next){
  if(PathArr.indexOf(to.path) !== -1){
    const token = localStorage.getItem('token')
    if(token){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})
export default router

