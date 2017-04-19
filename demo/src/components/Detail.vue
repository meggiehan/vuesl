<!-- 订单详情详情部件 -->
<template>
  <div class="pannel">
    <p class="p-title"><b><slot name="title"></slot></b></p>
    <div class="content-nickname">
      <p><span class="content-l">昵称：</span><span class="content-r">联系电话：</span></p>
      <p><span class="content-l">所在地区：</span></p>
    </div>
    <div class="content-info">
      <p class="p-title">订单信息</p>
      <p><span class="content-l">订单编号：</span><span class="content-r">支付交易号：</span></p>
      <p><span class="content-l">付款时间：</span><span class="content-r">创建时间：</span></p>
    </div>
    <table border='0' cellspacing="0" cellpadding="5" width='720' height='100'>
      <tr>
        <th>商品名称</th>
        <th>规格</th>
        <th>货号</th>
        <th>销售单价</th>
        <th>数量</th>
        <th>运费</th>
        <th>总金额</th>
        <th>订单状态</th>
        <th>配送状态</th>
        <th>采购方式</th>
        <th>优惠价方式</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <div class="logistics">
      <p class="p-title p-title3"><b>收货和物流信息</b></p>
      <p><span>物流信息</span></p>
      <p><span class="content-l">付款时间：</span></p>
      <p><span class="content-l">收货地址：</span></p>
      <p><span class="content-l">浙江省 绍兴市 大唐镇</span></p>
      <p><span class="content-l">运送方式：</span></p>
      <p><span class="content-l">运单号：</span><span class="content-r"><a href="javascript:;" @click="toLogistic()">查看物流信息</a></span></p>
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
    name: 'detail',
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
      toLogistic () {
        console.log('TO')
        this.quit()
      },
      operate (tp, url) {
        tp === 'sure' && this.sure(url)
        tp === 'quit' && this.quit()
      },
      quit () {
        console.log('退出')
        this.$emit('close', {name: 'detail'})
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
      margin-bottom: .22rem
    .logistics
      margin-top: .25rem
      .p-title3
        margin-bottom: 0rem
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
    .content-info
      height: 1.94rem
      margin: .59rem 0 0 0
      /*height: .1.74rem*/
      /*margin: .19rem 0 0 0*/
  .content-l
    width: 3.84rem
  span
    /*padding: 0.1rem 0*/
    display: inline-block
    height: .38rem
    line-height: .38rem
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

