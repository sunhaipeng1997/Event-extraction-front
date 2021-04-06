import Vue from 'vue'
import VueRouter from 'vue-router'
import NewsManage from '../views/NewsManage'
import Index from '../views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"事件抽取",
    component:Index,
    show:true,
    redirect:"/NewsManage",
    children:[
      {
        path:"/NewsManage",
        name:"新闻列表",
        component:NewsManage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
