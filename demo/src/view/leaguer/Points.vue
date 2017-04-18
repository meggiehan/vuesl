<template>
  <div class="wrap">
    <tip :parent="nav.parent" :child="nav.child"></tip>
    <div class="role main">
      <!--filters变量  props-->
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建会员积分</button>
        <tables :method="method"
                :column="column"
                :options="options"
                :filter="filters"></tables>
      </div>

    </div>
    <transition name="slide-fade">
      <!--创建会员订单-->
      <!--弹出层的小组件（里面所有的框和取消 和保存）-->
      <panel :panels="panels" :types="types" @close="close" v-if="show.panel">
        <!--@close 点击退出 弹出层消失-->
        <!--会员创建-->
        <span slot="title">{{title}}</span>
      </panel>
    </transition>
    <confirm ref="dialog" :msg="confirms"></confirm>
  </div>

</template>

<script>
  import Tip from '../../components/Tip.vue'
  import Filters from '../../components/Filters.vue'
  import Panel from '../../components/Panel.vue'
  import Confirm from '../../components/Modal/Confirm.vue'
  import Tables from '../../components/Tables.vue'
  import api from '../../api/api.js'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'points',
    data () {
      return {
        confirms: {
          title: '提示',
          body: '确定删除?'
        },
        nav: {
          parent: '会员管理',
          child: '会员积分导入'
        },
        filters: [
          {name: 'Search', size: 'big', type: 'input', val: ''}
        ],
        method: {
          list: 'points_list'
        },
        show: {
          panel: false,
          auth: false,
          panelword: false
        },
        panels: [
          {name: 'No', text: '用户名', holder: '请输入用户名*...', type: 'input', sub: 'input', check: 'is_null'},
          {name: 'Password', text: '密码', holder: '请输入密码*...', type: 'input', sub: 'password', check: 'is_null'},
          {name: 'Name', text: '姓名', holder: '请输入姓名*...', type: 'input', sub: 'input', check: 'is_null'},
          {name: 'Phone', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'input', check: 'is_mobile'},
          {name: 'Email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email', check: 'is_email'},
          {
            name: 'Status',
            text: '是否激活',
            type: 'radio',
            sub: 'radio',
            radioval: [{text: '是', val: 1}, {text: '否', val: 0}]
          }
        ],
        title: '',
        types: ['sure', 'quit'],
        column: [
          {text: '序号', name: 'Disp_index'},
          {text: '用户名', name: 'No'},
          {text: '姓名', name: 'Name'},
          {text: '手机号码', name: 'Phone'},
          {text: '最后登录时间', name: 'Create_time'}
        ],
        options: [
          {name: '编辑', method: this.edit},
          {name: '删除', method: this.del}
        ]
      }
    },
    components: {
      tip: Tip,
      filters: Filters,
      panel: Panel,
      confirm: Confirm,
      tables: Tables
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
          {name: 'save', text: '保存', url: 'points_insert'}
        ]
        this.resetsingle()
        for (let i in this.show) {
          if (i === name) {
            this.show[i] = !this.show[i]
          } else {
            this.show[i] = false
          }
        }
        this.title = '会员积分创建'
      },
      del (idx, id) {
        let updata = []
        updata.push(id)
        this.$refs.dialog.confirm().then(() => {
//        api.post({JSON: JSON.stringify(updata)}, 'orders_delete').then((item) => {
//          this.getdata()
//        })
          api.mockDel({JSON: JSON.stringify(updata)}, 'points').then((item) => {
            this.getdata()
          })
        })
        console.log(123456, updata)
      },
      edit (idx) {
        this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'points_update'}
        ]
        this.show.panel = !this.show.panel
        this.title = '编辑仓库'
      }
    }
  }
</script>
