export const increment = state => {
  state.count++
}
export const decrement = state => {
  state.count--
}
export const setfliter = (state, param) => {
  // console.log('222', param)
  state.filters[state.current] = state.filters[state.current] || {}
  state.filters[state.current][param.name] = param.id
  console.log(11111, state.filters)
}
export const resetfilter = (state, param) => {
  state.filters[param] = {
    page: 1
  }
}
export const getdata = (state, data) => {
  state.data = data
}
export const getsingle = (state, index) => {
  state.single = JSON.parse(JSON.stringify(state.data[index]))
  console.log('iiiii', index)
}
export const setcurrent = (state, param) => {
  state.current = param
}
