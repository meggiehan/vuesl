<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <div class="wrap-panel">
      <ul class="tab-panel">
        <li v-for="(item,idx) in list.slice((page-1)*5,page*5)" v-bind:class="{active:(idx+(page - 1) * 5)=== index }" @click="changes(idx)"><span>{{item.title}}</span></li>
      </ul>
    </div>
    <div >
      <ul class="render-list">
      <div class="form-input" v-for="item in list[index]['childs']">
      <inputer v-if="item.type == 'input'" :child="item" ></inputer>
      <radioer v-if="item.type == 'radio'" :child="item" @toparent="change"></radioer>
      <multi v-if="item.type == 'multi'" :child="item" @toparent="change"></multi>
      <textareaer v-if="item.type == 'textarea'" :child="item" @toparent="change"></textareaer>
      <selecter v-if="item.type == 'select'" :child="item" @toparent="change"></selecter>
      <manage v-if="item.type == 'manage'" :child="item" @toparent="change"></manage>
      <searcher v-if="item.type == 'searcher'" :child="item" :id="single.Id" @toparent="change"></searcher>
    	</div>
      </ul>
    </div>
 </div>
</template>

<script>
	/* eslint-disable */
  import Inputer from './panel/Inputer.vue'
  import Radioer from './panel/Radioer.vue'
  import Multi from './panel/multi.vue'
  import Textareaer from './panel/Textareaer.vue'
  import Selecter from './panel/Selecter.vue'
  import Manage from './panel/Manage.vue'
  import Searcher from './panel/Searcher.vue'
  import api from '../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'tabs',
    props: {
      msg: ''
    },
    components: {
      inputer: Inputer,
      radioer: Radioer,
      multi: Multi,
      textareaer: Textareaer,
      selecter: Selecter,
      manage: Manage,
      searcher: Searcher
    },
    data () {
      return {
        types: ['quit', 'del', 'freeze', 'sure'],
        updata: {},
        page: 1,
        index: 0,
        texts: {
          quit: '退出',
          sure: '确定'
        },
        tdx: [],
        is_all: {},
        list: [
        {name: 'system', title: '创建供应商', childs: [
        {name: 'Name', text: '供应商名称', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '合同编号', holder: '请输入编号*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '供应商等级', holder: '请输入编号*...', type: 'input', sub: 'input'},
        {name: 'Name',size: 'small',type: 'select',text: '供应商等级',text1: '等级',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Name',size: 'small',type: 'select',text: '产品分类',text1: '选择分类',list: [{Name: '系统管理', Id: 1}, {Name: '商品信息管理', Id: 2}, {Name: '销售管理', Id: 3}, {Name: '采购管理',Id: 4}, {Name: '入库管理', Id: 5}, {Name: '在库管理', Id: 6}, {Name: '出库管理', Id: 7}, {Name: '退货管理',Id: 8 }, {Name: '入款管理', Id: 9}]},
        {name: 'Name',size: 'small',type: 'select',text: '供应商级别',text1: '级别',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Name',size1: 'small',type: 'select',text: '操作模式',text1: '操作模式',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Name', text: '签订时间', holder: '请输入编号*...', type: 'input', sub: 'date'},
        {name: 'Noqq', text: '终止时间', holder: '请输入编号*...', type: 'input', sub: 'date'},
        {name: 'Type',size: 'small',type: 'select',text: '操作品牌',text1: '选择品牌',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Type',size: 'small',type: 'select',text: '三方协议',text1: '选择',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Type',size: 'small',type: 'select',text: '授权区域',text1: '选择',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Name', text: '注册资本', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '注册号', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '组织机构代码', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '供应商销售额', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '供应商联系人', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '供应商电话号', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '售后联系人', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: 'MSN/QQ', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '邮箱', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '售后电话', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '财务电话', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '供应商地址', holder: '请输入描述内容*...', type: 'textarea', sub: 'textarea'},
        {name: 'Name', text: '售后地址', holder: '请输入描述内容*...', type: 'textarea', sub: 'textarea'},
      ]},
        {name: 'goods', title: '本年度合同政策', childs:  [
        {name: 'Name', text: '目标销量', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'No', text: '预计毛利率', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'No', text: '保价政策', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'No', text: '质保金额', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Status',text: '月度折扣',type: 'radio',sub: 'radio',radioval: [{text: '扣点', val: '1'}, {text: '结算方式', val: '2'}]},
        {name: 'Status',text: '季度折扣',type: 'radio',sub: 'radio',radioval: [{text: '扣点', val: '1'}, {text: '结算方式', val: '2'}]},
        {name: 'Status',text: '年度折扣',type: 'radio',sub: 'radio',radioval: [{text: '扣点', val: '1'}, {text: '结算方式', val: '2'}]},
        {name: 'No', text: '规模折扣', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'No', text: '规模折扣', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Type',size: 'small',type: 'select',text: '开票模式',text1: '请选择',list: [{Name: '等级', Id: 1}, {Name: '权限', Id: 2}]},
        {name: 'Name', text: '市场费', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '保底量(代销/联销)', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '保底未完成的补差扣点', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '合同扫描照', holder: '请输入名称*...', type: 'input', sub: 'input'}
      ]},
          {name: 'order', title: '财务信息', childs: [
          {name: 'Name', text: '银行名称', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '银行账号', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '银行行号', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '银行地址', holder: '请输入名称*...', type: 'input', sub: 'input'}]},
          {name: 'buy', title: '售后条款', childs: [
          {name: 'Name', text: '退换待政策', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '包换期', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '包换处理周期', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '保质期', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '退修运费承担', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '维修处理周期', holder: '请输入名称*...', type: 'input', sub: 'input'},
          {name: 'Name', text: '滞销品退换货', holder: '请输入名称*...', type: 'input', sub: 'input'}
          ]},
          {name: 'Name', title: '补充条款',childs: [
          {name: 'Name', text: '银行名称', holder: '请输入名称*...', type: 'input', sub: 'input'}
          ]}
        ]
      }
    },
    methods: {
      operate (tp) {
        tp === 'sure' && this.sure()
        tp === 'quit' && this.quit()
        tp === 'del' && this.del()
        tp === 'freeze' && this.freeze()
      },
      sure () {
        console.log(this.updata)
        this.$emit('close', {name: 'auth'})
      },
      quit () {
        this.$emit('close', {name: 'auth'})
      },
      del () {
        this.$emit('close', {name: 'auth'})
      },
      freeze () {
        this.$emit('close', {name: 'auth'})
      },
      changes (idx) {
        this.index = (this.page - 1) * 5 + idx
//      console.log(this.list[this.index].childs)
//      this.tdx = this.updata[this.list[this.index].name] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].name])) : []
      },
      change (value) {
        this.updata[value.name] = value.val
        console.log('assasaasssssssss', value.val)
      },
      insert (data, idx, id) {
        this.tdx = this.updata[data.name] ? JSON.parse(JSON.stringify(this.updata[data.name])) : []
        let im = this.tdx.indexOf(id)
        if (im === -1) {
          this.tdx.push(id)
        } else {
          this.tdx.splice(im, 1)
        }
        this.updata[data.name] = JSON.parse(JSON.stringify(this.tdx))
        console.log(this.updata)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../lib/stylus/until.styl' 
  .choice
    display:inline-block
    width:.25rem
    height:.25rem
    vertical-align:middle
    border-radius:50%
    border:.01rem solid #535353
    margin-right:.1rem
    line-height:.23rem
    text-align:center
    cursor:pointer
    &.active
      span
          background:#ffa725
    span
      width:.13rem
      height:.13rem
      border-radius:50%
      display:inline-block
  .pannel
    position: fixed
    overflow-y:auto
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    z-index:55
    padding:.5rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.2rem 0
      border-bottom:.01rem solid #858659
    .wrap-panel
      position:relative
      border-bottom:.01rem solid #858689
    .tab-page
      width:.75rem
      position:absolute
      right:0
      top:0
      height:.6rem
      font-size:0
      li
        display:inline-block
        width:.25rem
        height:.25rem
        border:.01rem solid #fea525
        margin-top:.2rem
        border-radius:.03rem
        cursor:pointer
        text-align:center
        line-height:.23rem
        font-size:.18rem
        &:last-child
          margin-left:.08rem
    .tab-panel
      height:.6rem
      margin-right:.75rem
      li
        height:.58rem
        line-height:.58rem
        width:20%
        display:inline-block
        text-align:left
        cursor:pointer
        span
          display:inline-block
          padding:0 .04rem
        &.active
          span
            border-bottom:.03rem solid #ffa626
    .render
      .select-all
        border-top:.01rem solid #858689
        height:.8rem
        line-height:.8rem
        margin-top:.15rem
      .render-list
        li
          height:.55rem
          line-height:.55rem
    .form-action
      text-align:center
      margin-top:1.5rem
      width:8rem
      margin-left:-.4rem
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
        &.del
          border:.01rem solid #e40300
        &.freeze
          border:.01rem solid #B2F1EA
</style>

