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
export const getsingle = ({commit}, index) => {
  commit('getsingle', index)
}
export const resetsingle = ({commit}) => commit('resetsingle')
export const setcurrent = ({commit}, param) => {
  commit('setcurrent', param)
}
export const togglemodal = ({commit}) => commit('togglemodal')
export const confirmyes = ({commit}) => commit('confirmyes')
export const confirmno = ({commit}) => commit('confirmno')
export const alerts = ({commit}, modal) => {
  commit('setmodal', modal)
  commit('togglemodal')
  console.log('asasasasasasas')
}
export const togglenotice = ({commit}) => commit('togglenotice')
export const notice = ({commit}, notice) => {
  commit('setnotice', notice)
  commit('togglenotice')
  setTimeout(function() {
    commit('togglenotice')
  }, notice.time || 3000);
}
