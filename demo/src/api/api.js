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
  'menu_list': 'vchange.func.list' //菜单列表请求地址
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
// const baseUrl = 'http://192.168.2.120/VChangeUserService/Router.aspx'
const baseUrl = 'http://192.168.2.110/VChangeUserService/Router.aspx'
const api = {}
api.get = (requestData, method) => {
  console.log('re', requestData)
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, {}, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.get(baseUrl + '?' + request.url, {
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/json; charset=utf-8'
      // },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response.results)
    })
  })
}

api.post = (requestData, method) => {
  console.log('sss', method)
  PARAM.method = METHOD[method]
  let request = GetSignature(PARAM, {}, SECRET)
  return new Promise((resolve, reject) => {
    Vue.http.post(baseUrl, request.returns, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      emulateJSON: true
    }).then(function (response) {
      resolve(response.body.Response.results)
      
    })
  })
}
export default api

