<!-- 订单详情物流部件 -->
<template>
  <div class="pannel">
    <p class="p-title"><slot name="title"></slot></p>
    <div class="tan-order">
      <p><span class="content-l content-l1">订单编号：</span><span class="content-r">创建时间：</span></p>
      <p><span class="content-l">物流编号：</span></p>
      <p><span class="content-l">发货方式：</span></p>
      <p><span class="content-l">物流公司：</span></p>
      <p><span class="content-l content-l5">运单号：</span></p>
    </div>
    <div class="content-info">
      <p class="p-title">物流动态</p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
      <p><span class="content-l">2017-3-28 19:55:55</span><span class="content-r">在上海浦东新区峨山路公司进行揽件扫描</span></p>
    </div>
    <div class="form-action">
      <button  @click="quit()">退出</button>
    </div>
  </div>
</template>

<script>
  import Inputer from './panel/Inputer.vue'
  // import api from '../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'logistic',
    props: {
    },
    data () {
      return {
        updata: {}
      }
    },
    components: {
      inputer: Inputer
    },
    computed: {
      ...mapGetters([
        'single'
      ])
    },
    methods: {
      ...mapActions(['getdata', 'notice']),
      operate (tp, url) {
        tp === 'sure' && this.sure(url)
        tp === 'quit' && this.quit()
      },
      quit () {
        console.log('退出')
        this.$emit('close', {name2: 'logistic', val: false})
      },
      change (value) {
        console.log('DSDSD', this.updata['Password'])
        this.updata[value.name] = value.val
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../lib/stylus/until.styl'
  .pannel
    position: fixed
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    overflow-y:auto
    z-index:55
    padding:.4rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.13rem 0
      border-bottom:.01rem dashed #858659
      margin-bottom:.3rem
    .form-action
      text-align:center
      margin-top:.5rem
      button
        text-align: center
        height:.5rem
        line-height:.5rem
        border-radius:.06rem
        color:#000
        font-size:.14rem
        width:1.5rem
        background:#fff
        margin:0 .2rem
        cursor:pointer
        border:.01rem solid #B2F1EA
  .content-l
    width: 3.84rem
  span
    display: inline-block
    line-height: .4rem
    height: .4rem
  .content-l1
    margin-bottom: .1rem
  .content-l5
    margin-bottom: .2rem
  table
    border: 1px solid #C6C6C6
    border-top: none
  th
    height: .4rem
    background-color: #E9E9E9
    border-right: .02rem solid #D7D7D7
  td
    height: .59rem
    border-right: .02rem solid #E2E2E2
  .logistics
    a
      color: #3C94C4
</style>

