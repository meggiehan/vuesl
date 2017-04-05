<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
    <filters :filters="filters"
             :method="method"></filters>
    <div class="option">
      <button class="btn" @click="create()">创建菜单</button>
    </div>
      <tables :method="method"
              :column="column"
              :options="options"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" :types="types" @close="close" v-if="show">
      <span slot="title">{{title}}</span>
    </panel>
  </transition>
</div>

</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
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
        {text: '编号', name: 'No'},
        {text: '名称', name: 'Name'},
        {text: '类型', name: 'Type'},
        {text: '父菜单', name: 'Remark'},
        {text: '排序', name: 'Status'},
        {text: '最后操作时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit}
      ],
      panels: [
        {name: 'name', text: '名称', holder: '请输入名称*...', type: 'input', sub: 'input'},
        {name: 'number', text: '编号', holder: '请输入编号*...', type: 'input', sub: 'input'},
        {
          name: 'part3',
          size: 'small',
          type: 'select',
          text: '类型',
          text1: '请选择类型',
          list: [{title: '菜单', id: 1}, {title: '权限', id: 2}]
        },
        {
          name: 'part4',
          size: 'small',
          type: 'select',
          text: '父菜单',
          text1: '选择父菜单',
          list: [{title: '系统管理', id: 1}, {title: '商品信息管理', id: 2}, {title: '销售管理', id: 3}, {
            title: '采购管理',
            id: 4
          }, {title: '入库管理', id: 5}, {title: '在库管理', id: 6}, {title: '出库管理', id: 7}, {
            title: '退货管理',
            id: 8
          }, {title: '入款管理', id: 9}]
        },
        {name: 'order', text: '排序', holder: '请输入序号*...', type: 'input', sub: 'input'},
        {name: 'url', text: 'URL', holder: '请输入URL地址*...', type: 'input', sub: 'url'},
        {name: 'active', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 'one'}, {text: '否', val: 'two'}]},
        {name: 'description', text: '描述', holder: '请输入描述内容*...', type: 'textarea', sub: 'textarea'}
      ],
      types: ['sure', 'quit'],
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
    close () {
      this.show = false
    },
    create () {
      this.show = !this.show
      this.title = '创建菜单'
    },
    edit (idx) {
      this.show = !this.show
      this.title = '编辑菜单'
//        console.log(2222, this.list[idx])
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">

</style>
