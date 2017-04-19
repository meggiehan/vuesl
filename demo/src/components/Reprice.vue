<!-- 筛选组装主部件 -->
<template>
 <div class="pannel" v-bind:class="styles">
    <p class="p-title"><slot name="title"></slot{{styles}}</p>
    <p>订单原价(不含运费)：<span>66000元</span></p>
    <div class="clearfloat tabs" >
	<!--<table>
	<tr>
	<th>商品信息</th><th>单价</th><th>数量</th>
	<th>原价</th><th>涨价</th><th>邮费</th>
	</tr>
	<tr>
	<td>Lois</td><td>Lois</td><td>Lois</td>
	<td>Griffin</td><td>Lois</td><td>Lois</td>
	</tr>
	</table>-->
    </div>
    <div class="form-action">
    <button>返回</button>
    <button>确定</button>
    </div>
 </div>
</template>

<script>
//import api from '../api/api.js'
//import { CheckRule } from '../mixins/index.js'
//import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'reprice',
    props: {
      panels: '',
      styles: ''
    },
    data () {
      return {
      	
      }
    }
  }
</script>

<style scoped lang="stylus">
/*  @import '../lib/stylus/until.styl'*/
  .pannel
    position: fixed
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    overflow-y:auto
    z-index:55
    padding:.5rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.2rem 0
      border-bottom:.01rem solid #858659
      margin-bottom:.1rem
    &.large
      width:12rem
      .form-input
        float:left
        width:50%
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
        &.quit
          border:.01rem solid #B2F1EA
        &.sure
          border:.01rem solid #e40300
        &.save
          border:.01rem solid #e40300
</style>

