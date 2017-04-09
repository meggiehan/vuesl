/* eslint-disable */
import api from '../api/api.js'
export const increment = ({commit}) => commit('increment')
export const decrement = ({commit}) => commit('decrement')
export const setfliter = ({commit}, param) => {
  commit('setfliter', param)
}
export const resetfilter = ({commit}, param) => commit('resetfilter', param)
export const getdata = ({commit, state}) => {
  let method = state.current + '_list'  
  api.list(state.filters[state.current], method).then(item => {
    commit('getdata', item.results || [])
    commit('getpage', item || {})
  })
}
export const getsingle = ({commit, state}, index) => {
  api.post({JSON: JSON.stringify({Id: state.data[index].Id})}, 'part_info').then((item) => {
    console.log('itemsdsdsd', item)
  })
  commit('getsingle', index)
}
export const resetsingle = ({commit}) => commit('resetsingle')
export const setcurrent = ({commit}, param) => {
  commit('setcurrent', param)
}
