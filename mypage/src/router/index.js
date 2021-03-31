import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import open from '../components/open'
import home from '../components/home'
import user from '../components/user'
import boke from '../components/boke'
import text from '../components/text'
import demo from '../components/demo'

Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
export default new Router({
  routes: [
    {
      path: '/',
      name: 'open',
      component: open
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
      path:'/user',
      name:'user',
      component:user
    },
    {
      path:'/boke',
      name:'boke',
      component:boke
    },
    {
      path:'/text',
      name:'text',
      component:text
    },
    {
      path:'/demo',
      name:'demo',
      component:demo
    }
  ]
})
