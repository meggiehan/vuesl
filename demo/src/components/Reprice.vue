<!-- 筛选组装主部件 -->
<template>
 <div class="pannel" v-bind:class="styles">
    <p class="p-title"><slot name="title"></slot{{styles}}</p>
    <p class="form-pay">订单原价(不含运费)：<span class="payfor">66000</span>元</p>
    <div  >
	<table class="tabs">
	<tr>
	<th>商品信息</th><th>单价</th><th>数量</th>
	<th>原价</th><th>涨价</th><th>邮费</th>
	</tr>
	<tr>
	<td><p>家用电器/3C数码/瑞思</p><p>产品型号：R5-7000</p><p>产品型号：R5-7000</p><p>产品型号：R5-7000</p><p>产品型号：R5-7000</p></td>
	<td>Lois</td>
	<td>Lois</td>
	<td>Griffin</td>
	<td><input type="num" class="discount" />折=<input type="num" class="discount" /></td>
	<td>快递<br /><input type="text" value="0.00" class="postage" /><br />直接输入邮费金额</td>
	</tr>
	</table>
    </div>
    <p class="addrss">收货地址：上海 上海浦东新区商城路2225弄强生大厦11-3</p>
    <p class="pocket">卖家实付： 6600+0.0+0.0=<span>6600</span></p>
    <div class="form-action">
    <button @click='quit()'>返回</button>
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
    },
    methods:{
    	quit (){
    		console.log('nnnnnnnnnnnnn')
    		this.$emit('close', {name: 'reprice'})
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
    .tabs{
       margin-top:.4rem
	   width:100%
	   border:.01rem solid #ccc
	   border-collapse:collapse
    }
    th
    	text-align:center
    	font-size:.2rem
    	background:#D3D3D3
	    margin-left:20px
	    height:.7rem
	    border-right:.01rem solid #ccc
    td
      text-align:center
      font-size:.1rem
      margin-left:20px
      height:1.5rem
      border-right:.01rem solid #ccc
      /*border-bottom:.01rem solid #ccc*/
    .p-title
      font-size:.2rem
      padding:.2rem 0
      border-bottom:.01rem solid #858659
      margin-bottom:.1rem
    .form-pay
     font-size:.2rem
    .payfor
    	color:red
    .pocket
     font-size:.18rem
     margin-top:0.3rem
    .addrss
      font-size:.18rem
      margin-top:0.3rem
    .postage
      width:.5rem
      border:1px solid #858659
    .discount
      width:.5rem
      border:1px solid #858659
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
        margin-top:4rem
        cursor:pointer
        &.quit
          border:.01rem solid #B2F1EA
        &.sure
          border:.01rem solid #e40300
        &.save
          border:.01rem solid #e40300
</style>

