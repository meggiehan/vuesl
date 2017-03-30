<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <p class="p-title"><slot name="title"></slot></p>
    <div class="form-input" v-for="item in panels">
      <inputer v-if="item.type == 'input'" :child="item" @toparent="change"></inputer>
      <radioer v-if="item.type == 'radio'" :child="item"></radioer>
      <selecter v-if="item.type == 'select'" :child="item" @toparent="change"></selecter>
    </div>
    <div class="form-action">
      <button :class="item" v-for="item in types" @click="operate(item)">{{texts[item]}}</button>
    </div>
 </div>
</template>

<script>
  import Inputer from './panel/Inputer.vue'
  import Radioer from './panel/Radioer.vue'
  import Selecter from './panel/Selecter.vue'
  export default {
    name: 'panel',
    props: {
      panels: '',
      types: ''
    },
    data () {
      return {
        updata: {},
        texts: {
          quit: '退出',
          sure: '确定'
        }
      }
    },
    components: {
      inputer: Inputer,
      radioer: Radioer,
      selecter: Selecter
    },
    methods: {
      operate (tp) {
        tp === 'sure' && this.sure()
        tp === 'quit' && this.quit()
      },
      sure () {
        console.log('value', this.updata)
        this.$emit('close')
      },
      quit () {
        this.$emit('close')
      },
      change (value) {
        this.updata[value.name] = value.val
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
  .form-action
    text-align:center
    margin-top:.5rem
    button
      text-align: center
      height:.5rem
      line-height:.5rem
      border-radius:.06rem
      color:#000
      font-size:.14rem
      width:1.5rem
      background:#fff
      margin:0 .2rem
      cursor:pointer
      &.quit
        border:.01rem solid #B2F1EA
      &.sure
        border:.01rem solid #e40300
</style>

