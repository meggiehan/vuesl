<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <p class="p-title">用户编辑</p>
    <div class="form-input" v-for="item in panels">
      <inputer v-if="item.type == 'input'" :child="item"></inputer>
    </div>
    <button @click="up()"> 提交</button>
 </div>
</template>

<script>
  import Inputer from './panel/Inputer.vue'
  export default {
    name: 'panel',
    props: {
      panels: ''
    },
    data () {
      return {
        updata: {}
      }
    },
    components: {
      inputer: Inputer
    },
    methods: {
      topanel (value) {
        this.update[value.name] = value.val
      },
      up () {
        console.log(this.updata)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../lib/stylus/until.styl' 
  .pannel
    position: fixed
    top:1rem
    right:0
    bottom:0
    background:#fff
    width:8rem
    z-index:55
    padding:.5rem .4rem 0
    vendor('box-shadow',3px 3px 8px 2px)
    .p-title
      padding:.2rem 0
      border-bottom:.01rem solid #858659
      margin-bottom:.1rem
</style>

