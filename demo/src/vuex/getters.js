const Pagenum = 6
const Pagesize = 3
export const count = state => state.count
export const filters = state => state.filters
export const list = state => state.data
export const single = state => state.single
export const leng = state => Math.ceil(state.data.length / Pagenum)
export const current = state => state.current
export const arr = state => {
  let num = state.data.length <= Pagesize ? state.data.length : Pagesize
  let arr = []
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  console.log(211, arr)
  return arr
}
