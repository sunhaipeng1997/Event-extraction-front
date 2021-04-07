import Vue from 'vue'
import VueRouter from 'vue-router'
import EventExtraction from '../views/EventExtraction'
import Index from '../views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    name:"菜单",
    component:Index,
    show:true,
    meta:{
      name:"首页"
    },
    redirect:"/EventExtraction",
    children:[
      {
        path:"/EventExtraction",
        name:"事件抽取",
        meta:{
          name:"事件抽取"
        },
        component:EventExtraction
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
