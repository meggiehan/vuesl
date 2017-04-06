<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建用户</button>
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
  <transition name="slide-fade">
    <auth @close="close" v-if="show.auth">
      <span slot="title">用户权限</span>
    </auth>
  </transition>
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import Auth from '../../components/Auth.vue'
// inport api from '../../api/api.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '用户管理'
      },
      title: '',
      method: {
        list: 'user_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
        {text: '用户名', name: 'Name'},
        {text: '姓名', name: 'Name'},
        {text: '手机号码', name: 'Disp_index'},
        {text: '用户角色', name: 'Disp_index'},
        {text: '所属部门', name: 'Disp_index'},
        {text: '最后登录时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '权限', method: this.auth}
      ],
      panels: [
        {name: 'User', text: '用户名', holder: '请输入用户名*...', type: 'input', sub: 'input'},
        {name: 'Password', text: '密码', holder: '请输入密码*...', type: 'input', sub: 'password'},
        {name: 'Name', text: '姓名', holder: '请输入姓名*...', type: 'input', sub: 'input'},
        {name: 'Mobile', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'input'},
        {name: 'Email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email'},
        {name: 'Status', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 'one'}, {text: '否', val: 'two'}]},
        {name: 'Role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
        {name: 'Part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
      ],
      types: ['sure', 'quit'],
      filters: [
        {name: 'name', size: 'big', type: 'input', val: ''},
        {name: 'active', size: 'small', type: 'select', text: '是否激活', list: [{title: '是', id: 1}, {title: '否', id: 2}]},
        {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    auth: Auth
  },
  computed: {
    ...mapGetters([
      'list'
    ])
  },
  methods: {
    ...mapActions(['resetsingle']),
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
      this.title = '创建用户'
    },
    edit (idx) {
      this.types = [
          {name: 'quit', text: '退出', url: ''},
          {name: 'save', text: '保存', url: 'user_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑用户'
    },
    auth (idx) {
      this.create('auth')
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
