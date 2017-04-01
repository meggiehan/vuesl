<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>     
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建角色</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"></tables>  
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
import { mapGetters } from 'vuex'
export default {
  name: 'role',
  data () {
    return {
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '角色管理'
      },
      title: '',
      method: {
        list: 'role_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
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
        {name: 'mobile', text: '手机', holder: '请输入手机号*...', type: 'input', sub: 'input'},
        {name: 'email', text: '邮箱', holder: '请输入邮箱', type: 'input', sub: 'email'},
        {name: 'active', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 'one'}, {text: '否', val: 'two'}]},
        {name: 'role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
        {name: 'part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
      ],
      types: ['sure', 'quit'],
      filters: [
        {name: 'name', size: 'big', type: 'input'},
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
    close (data) {
      this.show[data.name] = false
    },
    create (name) {
      console.log(name)
      for (let i in this.show) {
        if (i === name) {
          this.show[i] = !this.show[i]
        } else {
          this.show[i] = false
        }
      }
      this.title = '创建角色'
    },
    edit (idx) {
      // console.log(2222, this.list[idx])
      this.show = !this.show
      this.title = '编辑角色'
    },
    auth (idx) {
      console.log(2222223333)
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
