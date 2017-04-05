// import Vue from 'vue'
/* eslint-disable */
import api from '../api/api.js'
export const increment = ({commit}) => commit('increment')
export const decrement = ({commit}) => commit('decrement')
export const setfliter = ({commit}, param) => {
  commit('setfliter', param)
}
export const resetfilter = ({commit}, param) => commit('resetfilter', param)
export const getdata = ({commit, state}) => {
  // console.log('222', method)
  let method = state.current + '_list'  
  api.get(state.filters[state.current], method).then(item => {
    // console.log('hhee', state.filters)
    commit('getdata', item || [])
  })
}
export const getsingle = ({commit}, index) => commit('getsingle', index)
export const resetsingle = ({commit}) => commit('resetsingle')
export const setcurrent = ({commit}, param) => {
  commit('setcurrent', param)
}
