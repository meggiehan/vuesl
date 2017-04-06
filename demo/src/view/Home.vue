<template>
  <div id="home">
    <div id="nav">
      <div class="nav-top">
        <img src="../assets/logo.png" alt="" class="logo">
      </div>
      <ul class="nav-list level">
        <li class="top-li" v-for="(item, idx) in navlist">
          <p class="title" v-bind:class="{active:idx == index}" @click="index = idx"><img class="t-logo" src="../assets/icon1-s.png" alt=""><span class="t-name">{{item.name}}</span></p>
          <ul class="level-1" v-bind:class="{lactive:idx == index}">
            <li class="level-li" v-for="it in item.level1"><router-link :to="{name:it.link}">{{it.name}}</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    <div id="content">
      <div class="content-top">
        <img src="../assets/zhuye.png" alt="" class="home-icon"><span class="hello">欢迎页</span><span class="welcome">欢迎来到V联网后台管理</span>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    data () {
      return {
        index: 0,
        navlist: [
          {
            name: '系统管理',
            level1: [
              {name: '用户管理', link: 'User'},
              {name: '菜单管理', link: 'Menu'},
              {name: '部门管理', link: 'Part'},
              {name: '角色管理', link: 'Role'},
              {name: '供应商管理', link: 'Supplier'}
            ]
          },
          {
            name: '商品管理',
            level1: [
              {name: '首页', link: 'Index'}
            ]
          }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'current'
      ])
    },
    methods: {
      throttle (method, context) {
        clearTimeout(method.t)
        method.t = setTimeout(() => {
          method.call(context)
        }, 500)
      },
      handleResize () {
        // let percent = window.innerWidth / 1920
        // let font = 625 * percent
        // document.querySelector('html').style.fontSize = font + '%'
      }
    },
    mounted: function () {
      window.addEventListener('resize', () => {
        this.throttle(this.handleResize)
      })
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
<style lang="stylus">
  @import '../lib/stylus/common.styl'
  @import '../lib/stylus/nav.styl'
</style>
