<template>
  <div class="wrap">
    <tip :parent="nav.parent"
         :child="nav.child"></tip>
    <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create()">创建部门</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"></tables>
    </div>
    <transition name="slide-fade">
      <panel :panels="panels" :types="types" @close="close" v-if="show"></panel>
      <span slot="title">{{title}}</span>
    </transition>
  </div>
</template>

<script>
  import Tables from '../../components/Tables.vue'
  import Tip from '../../components/Tip.vue'
  import Filters from '../../components/Filters.vue'
  import Panel from '../../components/Panel.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'part',
    data () {
      return {
        show: false,
        nav: {
          parent: '系统管理',
          child: '部门管理'
        },
        title: '',
        method: {
          part: 'part_list'
        },
        column: [
          {text: '序号', name: 'No'},
          {text: '名称', name: 'Name'},
          {text: '编号', name: 'Disp_index'},
          {text: '最后操作时间', name: 'Operate_time'}
        ],
        options: [
          {name: '编辑', method: this.edit}
        ],
        panels: [
          {name: 'user', text: '用户名', holder: '请输入用户名*...', type: 'input', sub: 'input'},
          {name: 'password', text: '密码', holder: '请输入密码*...', type: 'input', sub: 'password'},
          {name: 'name', text: '姓名', holder: '请输入姓名*...', type: 'input', sub: 'input'},
          {name: 'mobile', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'date'},
          {name: 'email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email'}
        ],
        filters: [
          {name: 'select', size: 'big', type: 'input'},
          {
            name: 'user',
            size: 'small',
            type: 'select',
            text: '选择部门',
            list: [{title: '产品部', id: 1}, {title: '会服部', id: 2}, {title: '客服部', id: 3}, {
              title: '市场部',
              id: 4
            }, {title: '开发部', id: 5}, {title: '数据部', id: 6}, {title: '物流部', id: 7}, {
              title: '财务部',
              id: 8
            }, {title: '运维中心', id: 9}, {title: '采购部', id: 10}]
          }
        ]
      }
    },
    components: {
      tables: Tables,
      tip: Tip,
      filters: Filters,
      panel: Panel
    },
    computed: {
      ...mapGetters([
        'list'
      ])
    },
    methods: {
      close () {
        this.show = false
      },
      create () {
        this.show = !this.show
        this.title = '创建部门'
      },
      edit (idx) {
        // console.log(2222, this.list[idx])
        this.show = !this.show
        this.title = '编辑部门'
      },
      auth (idx) {
        console.log(44444)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">

</style>
