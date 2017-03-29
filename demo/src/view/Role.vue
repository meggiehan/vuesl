<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>     
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="show = !show">创建角色</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" v-if="show"></panel>
  </transition>  
</div>

</template>

<script>
import Tables from '../components/Tables.vue'
import Tip from '../components/Tip.vue'
import Filters from '../components/Filters.vue'
import Panel from '../components/Panel.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'role',
  data () {
    return {
      show: false,
      nav: {
        parent: '系统管理',
        child: '角色管理'
      },
      method: {
        list: 'role_list'
      },
      column: [
        {text: '序号', name: 'Id'},
        {text: '名称', name: 'Name'},
        {text: '编号', name: 'No'},
        {text: '时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '权限', method: this.auth}
      ],
      panels: [
        {name: 'user', text: '用户名', holder: '请输入用户名*...', type: 'input', sub: 'input'},
        {name: 'password', text: '密码', holder: '请输入密码*...', type: 'input', sub: 'password'},
        {name: 'name', text: '姓名', holder: '请输入姓名*...', type: 'input', sub: 'input'},
        {name: 'mobile', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'date'},
        {name: 'email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email'}
      ],
      filters: [
        {name: 'name', size: 'big', type: 'input'},
        {name: 'part', size: 'small', type: 'select', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
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
    edit (idx) {
      console.log(2222, this.list[idx])
    },
    auth (idx) {
      console.log(44444)
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
