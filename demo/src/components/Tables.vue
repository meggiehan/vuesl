<template>
<div class="tb">
  <table class="tablelist">
        <thead>
          <tr>
            <td v-for="it in column">{{it.text}}</td>
            <td v-if="options">操作</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in list.slice(10*(page-1),10*page)">
            <td v-for="its in column">{{item[its.name]}}</td>
            <td class="opt" v-if="options"><button class="option" v-for="it in options" @click="operate(idx)">{{it.name}}</button></td>
          </tr>
        </tbody>
    </table>
    <ul class="page">
      <li class="chevron"><</li>
      <li class="page-item" v-for="n in arr" @click="change(n)" v-bind:class="{active:n==page}">{{n}}</li>
      <li class="chevron right">></li>
      <li class="page-set"><input type="text"></li>
      <li class="page-go">GO</li>
      <li class="page-total">共&nbsp{{leng}}&nbsp页</li>
    </ul>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'tables',
  props: {
    method: {},
    column: '',
    options: ''
  },
  data () {
    return {
      page: 1,
      index: 1,
      arr: [1, 2, 3]
    }
  },
  methods: {
    operate (idx) {
      console.log(122)
      // this.getsingle(idx)
      this.$store.dispatch('getdata', idx)
    },
    show (idx) {
      let result = this.configure()
      if (idx <= 1) {
        this.arr = this.arr
      } else if (this.leng - idx <= 1) {
        this.arr = result.slice(this.leng - 3 >= 0 ? this.leng - 3 : 0, this.leng)
      } else {
        this.arr = result.slice(idx - 2, idx + 1)
      }
    },
    change (idx) {
      this.page = idx
      this.$store.dispatch('setfliter', {name: 'page', id: this.page})
      this.show(idx)
      this.$store.dispatch('getdata')
    },
    configure () {
      let i = this.leng
      let result = []
      while (i) {
        result.push(i)
        i--
      }
      result.reverse()
      return result
    },
    ...mapActions(['getdata', 'setfliter', 'getsingle'])
  },
  computed: {
    ...mapGetters([
      'list', 'filters', 'leng', 'single'
    ])
  },
  created () {
    this.$store.dispatch('getdata')
  }
}
</script>

<style scoped lang="stylus">
.tb
  padding-top:1px
  .tablelist
    margin-top:.2rem
    width:100%
    border:.01rem solid #ccc
    border-collapse:collapse
    td
      text-align:center
      height:.5rem
      border-right:.01rem solid #ccc
      border-bottom:.01rem solid #ccc
  .page
    margin-top:.2rem
    li
      display:inline-block
      width:.25rem
      height:.25rem
      -moz-user-select: none
      -webkit-user-select: none
      -ms-user-select: none 
      cursor:pointer
      &.page-total
        font-size:.13rem
        line-height:.25rem
        margin-left:.05rem
      &.page-go
        width:auto
        padding:0 .05rem
        height:.25rem
        line-height: .23rem
        font-size:.12rem
        border:.01rem solid #ccc
        margin-left:.2rem
        border-radius:.06rem
      &.page-set
        margin-left:.15rem
        input
          border-radius:.06rem
          width:.4rem
          background:#fff
          border:.01rem solid #ccc
          height:100%
          vertical-align:top
          padding:0 .04rem
      &.chevron
        line-height:.25rem
        text-align:left
        width:.2rem
        font-size:.17rem
        &.right
          text-align:right
      &.page-item
        border-radius: .06rem
        margin:0 .05rem
        text-align:center
        line-height:.23rem
        font-size:.13rem
        border:.01rem solid #ccc
      &.active
        background-color:#ffa625
        border:.01rem solid #ffa625
  .option
    height:.27rem
    padding:0 .08rem
    line-height:.27rem
    border:.01rem solid #42b2df
    font-size:.12rem
    width:auto
    background:#fff
    border-radius:.03rem
    margin:0 .03rem
    cursor:pointer
</style>

