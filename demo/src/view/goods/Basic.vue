<template>
<div class="wrap">
  <div class="tab-bar">
    <span>您在这里</span>
    <span class="parent">基本信息</span>
    <!--<span class="parent" v-bind:class="{active:index===1}" @click="index=1">> SKU</span>
    <span class="parent" v-bind:class="{active:index===2}" @click="index=2">>规格参数</span>
    <span class="parent" v-bind:class="{active:index===3}" @click="index=3">>商品详情</span>-->
  </div>
  <div class="m-title">
    <p>
      <span class="parent" v-bind:class="{active:index===0}" @click="index=0">基本信息</span>
      <span class="parent" v-bind:class="{active:index===1}" @click="index=1">> SKU</span>
      <span class="parent" v-bind:class="{active:index===2}" @click="index=2">>规格参数</span>
      <span class="parent" v-bind:class="{active:index===3}" @click="index=3">>商品详情</span>
    </p>
  </div>
  <div class="main">
    <baseinfo v-show="index === 0"></baseinfo>
    <sku v-show="index === 1"></sku>
    <parame v-show="index === 2"></parame>
    <detail ref="editor" v-show="index === 3"></detail>
  </div>
  <div class="foot">
    <button class="fbtn" @click="save">保存</button>
  </div>
  <confirm ref="dialog" :msg="confirms"></confirm>
</div>

</template>

<script>
import Confirm from '../../components/Modal/Confirm.vue'
import Baseinfo from '../../components/goods/Baseinfo.vue'
import Sku from '../../components/goods/Sku.vue'
import Parame from '../../components/goods/Parame.vue'
import Detail from '../../components/goods/Detail.vue'
// import api from '../../api/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'goods',
  data () {
    return {
      confirms: {},
      msg: '',
      step: ['base', 'sku', 'parame'],
      index: 0
    }
  },
  components: {
    confirm: Confirm,
    parame: Parame,
    sku: Sku,
    baseinfo: Baseinfo,
    detail: Detail
  },
  methods: {
    save () {
      this.$refs.editor.getcontent()
    }
  },
  computed: {
    ...mapGetters([
      'list'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus" scoped>
  .main
    margin-bottom:0
    padding-bottom:1px
  .foot
    text-align:right
    background: #fff;
    margin: 0 0.28rem;
    padding: 0 .72rem .25rem
    .fbtn
      width:1.52rem
      height:.52rem
      text-align:center
      border-radius:.06rem
      border:.01rem solid #3b95c2
      background:#fff
  .m-title
    background:#fff
    height:.6rem
    line-height:.6rem
    color:#000
    margin:0 .28rem
    padding:0 .42rem
    p
      text-indent: .4rem
      border-bottom:.01rem solid #5f6060
      height:100%
  .tab-bar,.m-title
    height:.48rem
    line-height:.48rem
    font-size:.14rem
    color:#898989
    padding:0 .28rem
    .parent
      color:#666666
      margin-left:.09rem
      cursor:pointer
    .active
      color:#318EBF
      margin-left:.09rem
  .slide-fade-enter-active
    transition: all .3s ease
    -webkit-transition: all .3s ease
  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-active
    transform: translateX(10px)
    -webkit-transform: translateX(10px)
    opacity: 0
</style>
