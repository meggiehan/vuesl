import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex'
import { resetfilter, setcurrent } from '../vuex/actions'
import Index from '@/view/Index'
import List from '@/view/List'
import Role from '@/view/system/Role'
import User from '@/view/system/User'
import Part from '@/view/system/Part'
import Supplier from '@/view/system/Supplier'
import Menu from '@/view/system/Menu'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/part',
      name: 'Part',
      component: Part
    },
    {
      path: '/supplier',
      name: 'Supplier',
      component: Supplier
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '*',
      redirect: '/role'
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to)
  let name = to.name.toLowerCase()
  setcurrent(store, name)
  resetfilter(store, name)
  next()
})
export default router
