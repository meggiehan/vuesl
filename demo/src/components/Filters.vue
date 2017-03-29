<!-- 筛选组装主部件 -->
<template>
 <div class="filters clearfloat">
      <div class="wrap-component f-l" v-for="item in filters">
        <selecter :param="item" :method="method" v-if="item.type=='select'"></selecter>
        <inputer :param="item" :method="method" v-if="item.type=='input'"></inputer>
      </div>
 </div>
</template>

<script>
  import Selecter from './filters/Selecter.vue'
  import Inputer from './filters/Inputer.vue'
  export default {
    name: 'filter',
    props: {
      filters: '',
      method: {}
    },
    components: {
      selecter: Selecter,
      inputer: Inputer
    }
  }
</script>

<style scoped lang="stylus">
  .filters
    min-height:.9rem
    padding:.11rem 0
    border-bottom:.01rem solid #a3aeb1
    .wrap-component
      padding:.1rem .59rem .1rem 0 
      padding-right:.59rem
</style>

