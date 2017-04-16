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
      <panel :panels="panels" :types="types" @close="close" v-if="show.panel">
        <span slot="title">{{title}}</span>
      </panel>
    </transition>
    <confirm ref="dialog" :msg="confirms"></confirm>
  </div>

</template>

<script>
  import Tables from '../../components/Tables.vue'
  import Tip from '../../components/Tip.vue'
  import Filters from '../../components/Filters.vue'
  import Panel from '../../components/Panel.vue'
  import Confirm from '../../components/Modal/Confirm.vue'
  import api from '../../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'user',
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
          child: '快递单号输入'
        },
        title: '',
        authId: '',
        method: {
          list: 'user_list'
        },
        column: [
          {text: '订单编号', name: 'No'},
          {text: '会员账号', name: 'Disp_index'},
          {text: '商品名称', name: 'Name'},
          {text: '商品型号', name: 'Phone'},
          {text: '数量', name: 'Disp_index'}
          // {text: '所属部门', name: 'Disp_index'},
          // {text: '最后登录时间', name: 'Create_time'}
        ],
        options: [
          {name: '编辑', method: this.edit},
          {name: '删除', method: this.del}
        ],
        panels: [
          {name: 'No', text: '原快递公司', holder: '请输入公司名*...', type: 'input', sub: 'input', check: 'is_null'},
          {name: 'Password', text: '原快递单号', holder: '请输入单号*...', type: 'input', sub: 'password', check: 'is_null'},
          {
            name: 'Type',
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
          {name: 'Search', size: 'big', type: 'input', val: ''}
          // {name: 'active', size: 'small', type: 'select', text: '是否激活', list: [{title: '是', id: 1}, {title: '否', id: 2}]},
          // {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
        ]
      }
    },
    components: {
      tables: Tables,
      tip: Tip,
      filters: Filters,
      panel: Panel,
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
          {name: 'save', text: '保存', url: 'user_insert'}
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
        this.title = '快递单号创建'
      },
      edit (idx) {
        this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'user_update'}
        ]
        this.show.panel = !this.show.panel
        this.title = '编辑礼包'
      },
      del (idx, id) {
        let updata = []
        updata.push(id)
        this.confirms.body = '确定删除？'
        this.$refs.dialog.confirm().then(() => {
          api.post({JSON: JSON.stringify(updata)}, 'user_delete').then((item) => {
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
