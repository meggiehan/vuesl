<template>
<div class="wrap">
  <div class="tab-bar"><span>您在这里</span><span class="parent">基本信息</span><span class="parent active">> SKU</span><span class="parent">>规格参数</span></div>
  <div class="m-title">
    <p>商品基本信息</p>
  </div>
  <div class="main">
    <baseinfo></baseinfo>
  </div>
  <confirm ref="dialog" :msg="confirms"></confirm>
</div>

</template>

<script>
import Confirm from '../../components/Modal/Confirm.vue'
import Baseinfo from '../../components/goods/Baseinfo.vue'
import Sku from '../../components/goods/Sku.vue'
import Parame from '../../components/goods/Parame.vue'
// import api from '../../api/api.js'
import { mapGetters } from 'vuex'
export default {
  name: 'goods',
  data () {
    return {
      confirms: {},
      msg: ''
    }
  },
  components: {
    confirm: Confirm,
    parame: Parame,
    sku: Sku,
    baseinfo: Baseinfo
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
  .tab-bar
    height:.48rem
    line-height:.48rem
    font-size:.14rem
    color:#898989
    padding:0 .28rem
    .parent
      color:#666666
      margin-left:.09rem
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
