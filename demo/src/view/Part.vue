<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"></filters>
      <tables :param="param"
              :column="column"></tables>
  </div>
</div>

</template>

<script>
import Tables from '../components/Tables.vue'
import Tip from '../components/Tip.vue'
import Filters from '../components/Filters.vue'
export default {
  name: 'role',
  data () {
    return {
      nav: {
        parent: '系统管理',
        child: '部门管理'
      },
      param: {
        url: '/part'
      },
      column: [
        {text: '序号', name: 'id'},
        {text: '名称', name: 'name'},
        {text: '编号', name: 'number'},
        {text: '时间', name: 'time'}
      ],
      filters: [
        {name: 'select', size: 'big', type: 'input'},
        {name: 'user', size: 'small', type: 'select', text: '选择类型', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
  
</style>
