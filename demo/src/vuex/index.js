import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)
const state = {
  count: 0,
  filters: {},
  data: [],
  single: [],
  pages: {},
  modal: {
    show: false,
    title: '消息提示',
    msg: '错误'
  },
  current: 'role',
  open: {
    panel: false,
    auth: false
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
