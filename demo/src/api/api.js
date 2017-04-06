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
  'part_list': 'vchange.dept.list',  //部门列表请求地址
  'user_list': 'vchange.groups.list' //用户列表请求地址
}
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
api.get = (requestData, method) => {
  console.log('re', requestData)
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, {}, SECRET)
  let url = baseUrl + '?' + request.url
  return new Promise((resolve, reject) => {
    Vue.http.get(url, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json; charset=utf-8'
      // },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response.results || response.body.Response.result)
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

