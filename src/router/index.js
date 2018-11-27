import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/index'
import IDE from '@/components/scIDE/IDE'
import Compile from '@/components/scIDE/Compile'
import Deploy from '@/components/scIDE/Deploy'
import Run from '@/components/scIDE/Run'
import Tool from '@/components/scIDE/Tool'
import Test from '@/components/scIDE/Test'
import Restful from '@/components/scIDE/Restful'
import Config from '@/components/scIDE/Config'

Vue.use(Router)
let routes = [
  {
    path: '/',
    name: 'IDE',
    component: IDE,
    children:[
      { path: '/ide-config/:projectName', name: 'IDE-Config', component: IDE-Config },
      {path: '/ide-compile/:projectName',name:'IDE-Compile',component:IDE-Compile},
      {path: '/ide-deploy/:projectName',name:'IDE-Deploy',component:IDE-Deploy},
      {path: '/ide-run/:projectName',name:'IDE-Run',component:IDE-Run},
      {path: '/ide-tool/:projectName',name:'IDE-Tool',component:IDE-Tool},
      {path: '/ide-test/:projectName',name:'IDE-Test',component:IDE-Test},
      {path: '/ide-restful/:projectName',name:'IDE-Restful',component:IDE-Restful,meta: {requiresAuth: true}}
    ]
  },
]

const router = new Router({
  routes: routes
})

router.beforeEach((to,from , next)=> {
  let payload = {
    projectName : "model",
    language : "2",
  }
  Store.dispatch('setProjectName',payload)
  let payload_projectInfo = {
    projectName : "model",
    language : "Python"
  }
  Store.dispatch('setProjectInfo',payload_projectInfo)

  next()
})

export default router
