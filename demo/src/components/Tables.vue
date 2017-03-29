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
            <td class="opt" v-if="options"><button class="option" v-for="it in options" @click="it.method(idx)">{{it.name}}</button></td>
          </tr>
        </tbody>
    </table>
    <ul class="page">
      <li v-for="n in arr" @click="change(n)" v-bind:class="{active:n==page}">{{n}}</li>
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
    ...mapActions(['getdata', 'setfliter'])
  },
  computed: {
    ...mapGetters([
      'list', 'filters', 'leng'
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
      width:.3rem
      -moz-user-select: none
      -webkit-user-select: none
      -ms-user-select: none 
      height:.3rem
      text-align:center
      line-height:.3rem
      font-size:.13rem
      cursor:pointer
      border:.01rem solid #ccc
      border-right:0
      &.active
        color:red
      &:last-child
        border-right:.01rem solid #ccc
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

