<template>
  <div class="wrap">
    <tip :parent="nav.parent"
         :child="nav.child"></tip>
    <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建快递单</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"
              :filter="filters"></tables>
    </div>
    <transition name="slide-fade">
      <reprice :panels="panels" :types="types" @close="close" v-if="show.panel">
        <span slot="title">{{title}}</span>
      </reprice>
    </transition>
    <confirm ref="dialog" :msg="confirms"></confirm>
  </div>

</template>

<script>
  import Tables from '../../components/Tables.vue'
  import Tip from '../../components/Tip.vue'
  import Filters from '../../components/Filters.vue'
  import Reprice from '../../components/Reprice.vue'
  import Confirm from '../../components/Modal/Confirm.vue'
  import api from '../../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'awaitpay',
    data () {
      return {
        confirms: {
          title: '提示',
          body: '确定删除?'
        },
        show: {
          panel: false
        },
        nav: {
          parent: '订单管理',
          child: '等待付款'
        },
        title: '',
        authId: '',
        method: {
          list: 'awaitpay_list'
        },
        column: [
          {text: '订单编号', name: 'No'},
          {text: '商品名称', name: 'Name'},
          {text: '商品型号', name: 'Phone'},
          {text: '数量', name: 'Number'},
          {text: '商品单价', name: 'Money'},
          {text: '支付时间', name: 'Time'},
          {text: '支付方式', name: 'Money'},
          {text: '会员账号', name: 'Number'},
          {text: '交易状态', name: 'Remark'},
          {text: '总金额', name: 'realy'}
        ],
        options: [
          {name: '查看详情', method: this.edit},
          {name: '修改价格', method: this.del}
        ],
        panels: [
          {name: 'Name', text: '原快递公司', holder: '请输入公司名*...', type: 'input', sub: 'input', check: 'is_null'},
          {name: 'Number', text: '原快递单号', holder: '请输入单号*...', type: 'input', sub: 'password', check: 'is_null'},
          {
            name: 'Company',
            size: 'small',
            type: 'select',
            text: '快递公司',
            text1: '全部公司',
            list: [{Name: '顺丰快递', Id: 'menu'}, {Name: '韵达快递', Id: 'auth'}, {Name: '中通快递', Id: 'menu'}, {Name: '邮政包裹', Id: 'auth'}, {Name: '银婕快递', Id: 'menu'}]
          },
          {name: 'Remark', text: '备注', holder: '请输入备注...', type: 'textarea', sub: 'textarea', check: 'is_null'}
          // {name: 'Name', text: '商品名称', holder: '请输入姓名*...', type: 'input', sub: 'input', check: 'is_null'},
          // {name: 'Phone', text: '商品型号', holder: '请输入手机号*...', type: 'input', sub: 'input', check: 'is_mobile'},
          // {name: 'Email', text: '数量', holder: '请输入邮箱', type: 'input', sub: 'email', check: 'is_email'}
          // {name: 'Status', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 1}, {text: '否', val: 0}]},
          // {name: 'RoleIdList', text: '用户角色', type: 'multi', sub: 'multi', get: {url: 'role_list'}, param: {PageNo: 1, Search: ''}, list: []},
          // {name: 'DeptIdList', text: '选择部门', type: 'multi', sub: 'multi', get: {url: 'part_list'}, param: {PageNo: 1, Search: ''}, list: []}
        ],
        types: ['sure', 'quit'],
        filters: [
          {name: 'Search', size: 'big', type: 'input', val: ''},
          // {name: 'Search', size: 'small', type: 'input', val: ''}
          // {name: 'Search', size: 'small', type: 'input', val: ''}
           {name: 'active', size: 'small', type: 'select', text: '商品名称', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '快递单号', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '订单状态', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '支付状态', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '支付时间范围', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '支付方式', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '订单来源', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '活动订单', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]},
           {name: 'active', size: 'small', type: 'select', text: '配送区分', list: [{title: '已支付', id: 1}, {title: '未支付', id: 2}]}
        ]
      }
    },
    components: {
      tables: Tables,
      tip: Tip,
      filters: Filters,
      reprice: Reprice,
      confirm: Confirm
    },
    computed: {
      ...mapGetters([
        'list'
      ])
    },
    methods: {
      ...mapActions(['resetsingle', 'getdata']),
      close (data) {
        this.show[data.name] = false
      },
      create (name) {
        this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'order_insert'}
        ]
        console.log(name)
        this.resetsingle()
        for (let i in this.show) {
          if (i === name) {
            this.show[i] = !this.show[i]
          } else {
            this.show[i] = false
          }
        }
        this.title = '修改价格'
      },
      edit (idx) {
        this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'order_update'}
        ]
        this.show.panel = !this.show.panel
        this.title = '编辑礼包'
      },
      del (idx, id) {
        let updata = []
        updata.push(id)
        this.confirms.body = '确定删除？'
        this.$refs.dialog.confirm().then(() => {
//          api.post({JSON: JSON.stringify(updata)}, 'order_delete').then((item) => {
//            this.getdata()
//          })
          api.mockDel({JSON: JSON.stringify(updata)}, 'order').then((item) => {
            this.getdata()
          })
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
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
