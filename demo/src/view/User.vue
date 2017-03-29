<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <tables :param="param"
              :column="column"></tables>
  </div>
</div>

</template>

<script>
import Tables from '../components/Tables.vue'
import Tip from '../components/Tip.vue'
// import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      nav: {
        parent: '系统管理',
        child: '供应商管理'
      },
      column: [
        {text: '序号', name: 'id'},
        {text: '名称', name: 'name'},
        {text: '时间', name: 'time'}
      ],
      param: {
        url: '/supplier'
      }
    }
  },
  components: {
    tables: Tables,
    tip: Tip
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
  
</style>
