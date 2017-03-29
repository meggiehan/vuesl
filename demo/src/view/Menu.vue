<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
    <filters :filters="filters"
             :method="method"></filters>
    <div class="option">
      <button class="btn" @click="show = !show">创建菜单</button>
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
  name: 'menu',
  data () {
    return {
      show: false,
      nav: {
        parent: '系统管理',
        child: '菜单管理'
      },
      method: {
        list: 'menu_list'
      },
      column: [
        {text: '序号', name: 'Id'},
        {text: '名称', name: 'Name'},
        {text: '编号', name: 'No'},
        {text: '类型', name: 'Type'},
        {text: '菜单', name: 'Remark'},
        {text: '排序', name: 'Status'},
        {text: '最后操作时间', name: 'Create_time'}
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
        {name: 'name', size: 'big', type: 'input'},
        {name: 'part1', size: 'small', type: 'select', text: '类型', list: [{title: '菜单', id: 1}, {title: '权限', id: 2}]},
        {name: 'part2', size: 'small', type: 'select', text: '菜单', list: [{title: '系统管理', id: 1}, {title: '商品信息管理', id: 2}, {title: '销售管理', id: 3}, {title: '采购管理', id: 4}, {title: '入库管理', id: 5}, {title: '在库管理', id: 6}, {title: '出库管理', id: 7}, {title: '退货管理', id: 8}, {title: '入款管理', id: 9}]}
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">

</style>
