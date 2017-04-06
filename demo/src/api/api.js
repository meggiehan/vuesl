/* eslint-disable */
import Vue from 'vue'
import { GetSignature } from '../lib/js/until.js'
const gettime = (time) => {
  let tzoffset = (new Date()).getTimezoneOffset() * 60000
  let localISOTime = (new Date(Date.now() - tzoffset)).toISOString()
  localISOTime = localISOTime.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '-')
  return localISOTime
}
const METHOD = {
  'role_list': 'vchange.role.list', //角色列表请求地址
  'role_insert': 'vchange.role.insert', //添加角色
  'role_update': 'vchange.role.update', //修改角色
  'role_delete': 'vchange.role.delete', //删除角色
  'menu_list': 'vchange.func.list', //菜单列表请求地址
  'menu_insert': 'vchange.func.insert', //增加菜单
  'menu_update': 'vchange.func.update', //修改菜单
  'menu_delete': 'vchange.func.delete', //删除菜单
  'user_list': 'vchange.groups.list', //用户列表请求地址
  'user_insert': 'vchange.groups.insert', //添加用户
  'user_update': 'vchange.groups.update', //修改用户
  'user_delete': 'vchange.groups.delete', //删除用户
  'part_list': 'vchange.dept.list' //部门列表请求地址

}
const PAGESIZE = 10
const SECRET = 'ED7B184CCAE248FF'
const PARAM = {
  method: '',
  ver: '1',
  timestamp: gettime(),
  format: 'json',
  app_key: '1000',
  sign_method: 'md5',
  session: '1799163E221F4638A27D0CBC47830C07'
}

// const baseUrl = 'http://192.168.2.162/VChangeUserService/Router.aspx'

const baseUrl = 'http://192.168.2.110/Router.aspx'
const api = {}
api.list = (requestData, method) => {
  console.log('re', requestData)
  let redata = JSON.parse(JSON.stringify(requestData))
  let updata = JSON.parse(JSON.stringify(PARAM))
  updata.method = METHOD[method]
  updata.PageSize = PAGESIZE
  updata.PageNo = redata.PageNo
  delete redata.PageNo
  let lastdata = {JSON: JSON.stringify(redata)}
  let request = GetSignature(updata, lastdata, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json; charset=utf-8'
      // },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response)
    })
  })
}
api.post = (requestData, method) => {
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, requestData, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=UTF-8'
      },
      emulateJSON: true,
    }).then(function (response) {
      resolve(response.body.Response.results || response.body.Response.result)

    })
  })
}
export default api

