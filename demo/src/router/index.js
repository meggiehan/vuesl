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
import Stock from '@/view/system/Stock'
import Category from '@/view/system/Category'
import Member from '@/view/system/Member'
import Tennet from '@/view/system/Tennet'
import Goods from '@/view/goods/Goods'
import Basic from '@/view/goods/Basic'
import Order from '@/view/orders/Order'
import Account from '@/view/leaguer/Account'
import Associator from '@/view/leaguer/Associator'
import Back from '@/view/leaguer/Back'
import Changes from '@/view/leaguer/Changes'
import Orders from '@/view/leaguer/Orders'
import Points from '@/view/leaguer/Points'
import Purchase from '@/view/purchase/Purchase'
import Login from '@/view/Login'
import Home from '@/view/Home'
import Catalogue from '@/view/goods/catalogue'
import Parameters from '@/view/goods/parameters'
Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: '',
      redirect: '/role',
      children: [
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
          path: '/category',
          name: 'Category',
          component: Category
        },
        {
          path: '/stock',
          name: 'Stock',
          component: Stock
        },
        {
          path: '/tennet',
          name: 'Tennet',
          component: Tennet
        },
        {
          path: '/member',
          name: 'Member',
          component: Member
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: '/catalogue',
          name: 'Catalogue',
          component: Catalogue
        },
        {
          path: '/parameters',
          name: 'Parameters',
          component: Parameters
        },
        {
          path: '/basic',
          name: 'Basic',
          component: Basic
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/account',
          name: 'Account',
          component: Account
        },
        {
          path: '/associator',
          name: 'Associator',
          component: Associator
        },
        {
          path: '/back',
          name: 'Back',
          component: Back
        },
        {
          path: '/changes',
          name: 'Changes',
          component: Changes
        },
        {
          path: '/orders',
          name: 'Orders',
          component: Orders
        },
        {
          path: '/points',
          name: 'Points',
          component: Points
        },
        {
          path: '/purchase',
          name: 'Purchase',
          component: Purchase
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
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
      path: '*',
      redirect: '/role'
    }
  ]
})
router.beforeEach((to, from, next) => {
  let name = to.name.toLowerCase()
  setcurrent(store, name)
  resetfilter(store, name)
  next()
})
export default router
