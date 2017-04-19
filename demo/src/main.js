// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import Resource from 'vue-resource'
import Vuecookie from 'vue-cookie'
import 'font-awesome-webpack'
// import Vueditor, {createEditor} from 'vueditor'
// import "./lib/css/vueditor.min.css"
// let config = {
//     toolbar: [
//       'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
//       'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
//       'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
//       'insertOrderedList', 'insertUnorderedList', '|', 'emoji', 'picture', 'tables', '|', 'switchView'
//     ],
//     mode: 'default',
//     iframePath: '',
//     fileuploadUrl: ''
//   }
// Vue.use(Vueditor, config)
import VueHtml5Editor from 'vue-html5-editor'
let options = {
    name: "vue-html5-editor",
    showModuleName: false,
    icons: {
      text: "fa fa-pencil",
      color: "fa fa-paint-brush",
      font: "fa fa-font",
      align: "fa fa-align-justify",
      list: "fa fa-list",
      link: "fa fa-chain",
      unlink: "fa fa-chain-broken",
      tabulation: "fa fa-table",
      image: "fa fa-file-image-o",
      hr: "fa fa-minus",
      eraser: "fa fa-eraser",
      undo: "fa-undo fa",
      "full-screen": "fa fa-arrows-alt",
      info: "fa fa-info",
    },
    image: {
        sizeLimit: 512 * 1024,
        upload: {
            url: null,
            headers: {},
            params: {},
            fieldName: {}
        },
        compress: {
            width: 1600,
            height: 1600,
            quality: 80
        },
        uploadHandler(responseText){
            var json = JSON.parse(responseText)
            if (!json.ok) {
                alert(json.msg)
            } else {
                return json.data
            }
        }
    },
    language: "zh-cn",
    i18n: {
        "zh-cn": {
            "align": "对齐方式",
            "image": "图片",
            "list": "列表",
            "link": "链接",
            "unlink": "去除链接",
            "table": "表格",
            "font": "文字",
            "full screen": "全屏",
            "text": "排版",
            "eraser": "格式清除",
            "info": "关于",
            "color": "颜色",
            "please enter a url": "请输入地址",
            "create link": "创建链接",
            "bold": "加粗",
            "italic": "倾斜",
            "underline": "下划线",
            "strike through": "删除线",
            "subscript": "上标",
            "superscript": "下标",
            "heading": "标题",
            "font name": "字体",
            "font size": "文字大小",
            "left justify": "左对齐",
            "center justify": "居中",
            "right justify": "右对齐",
            "ordered list": "有序列表",
            "unordered list": "无序列表",
            "fore color": "前景色",
            "background color": "背景色",
            "row count": "行数",
            "column count": "列数",
            "save": "确定",
            "upload": "上传",
            "progress": "进度",
            "unknown": "未知",
            "please wait": "请稍等",
            "error": "错误",
            "abort": "中断",
            "reset": "重置"
        }
    },
    hiddenModules: ["info"],
    visibleModules: [
        "text",
        "color",
        "font",
        "align",
        "list",
        "link",
        "unlink",
        "tabulation",
        "image",
        "hr",
        "eraser",
        "undo",
        "full-screen"
    ],
    modules: {}
}

Vue.use(VueHtml5Editor,options)
Vue.use(Resource)
Vue.use(Vuecookie)
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://192.168.2.110/VChangeUserService/Router.aspx'
// credentials设置true跨域有问题
Vue.http.options.credentials = false
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
