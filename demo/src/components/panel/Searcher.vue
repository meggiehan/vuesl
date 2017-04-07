<!-- 弹出层下拉部件 -->
<template>
  <div class="searcher">
    <div class="s-list">
      <label for=""></label>
      <input type="input" v-model="val" :placeholder="child.holder" @input="search()">
      <ul class="search-list" v-if="val" @scroll="handleScroll">
        <li v-for="item in userlist" @click="add(item.id,item)">{{item.name}}&nbsp&nbsp{{item.tel}}</li>
      </ul>
    </div>
    <ul class="render clearfloat">
      <li v-for="(item,idx) in list"><a href="javascript:;">{{item.name}}&nbsp&nbsp{{item.tel}}<i class="delete" @click="del(idx)">x</i></a></li>
    </ul>
  </div>
</template>

<script>
  import api from '../../api/api.js'
  export default {
    name: 'searcher',
    props: {
      child: ''
    },
    data () {
      return {
        index: -1,
        isshow: false,
        text1: this.child.text1,
        val: '',
        result: [],
        list: [],
        userlist: []
      }
    },
    methods: {
      handleScroll (e) {
        let sTop = e.srcElement.scrollTop
        let dHeight = e.srcElement.offsetHeight
        let sHeight = e.srcElement.scrollHeight
        if (sTop + dHeight >= sHeight + 2) {
          console.log(22222222)
          this.throttle(this.getuser, this, true)
        }
      },
      getuser (flag) {
        api.list(this.child.param, this.child.get.url).then(item => {
          console.log(111, item)
          if (flag) {
            this.userlist = this.userlist.concat([])
          } else {
            this.userlist = item.results
          }
        })
      },
      throttle (method, context, flag) {
        clearTimeout(method.t)
        method.t = setTimeout(() => {
          if (flag) {
            this.child.param.PageNo++
          } else {
            this.child.param.PageNo = 1
            this.child.param.Search = this.val
          }
          method.call(context, flag)
        }, 500)
      },
      add (id, item) {
        this.val = ''
        let index = this.result.indexOf(id)
        if (index === -1) {
          this.result.push(id)
          this.list.push(item)
        }
      },
      del (idx) {
        this.result.splice(idx, 1)
        this.list.splice(idx, 1)
      },
      search () {
        this.throttle(this.getuser, this, false)
      },
      change (idx) {
        this.index = idx
        this.isshow = !this.isshow
        this.text1 = this.child.list[idx].title
        this.$emit('toparent', {name: this.child.name, val: this.child.list[idx].id})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .render
    margin-top:1.3rem
    li
      width:25%
      padding:.07rem .1rem
      float:left
      a
        display:block
        height:.3rem
        line-height:.3rem
        background:#43aad5
        color:#fff
        font-size:.14rem
        text-align:center
        border-radius:.04rem
        .delete
          width:.16rem
          height:.16rem
          display:inline-block
          border-radius:50%
          border:.01rem solid #fff
          vertical-align:middle
          text-align:center
          line-height:.14rem
          font-size:.12rem
          position:relative
          top:-.01rem
          left:.05rem
  .s-list
      padding:.1rem 0
      height:.7rem
      position:relative
      .search-list
        position:absolute
        top:.7rem
        width:1.8rem
        left:1rem
        padding-top:1px
        border:.01rem solid #cbcbcb
        border-radius:.06rem
        max-height:2.1rem
        overflow-y:auto
        background:#fff
        li{
          margin-top:.1rem
          height:.25rem
          line-height:.25rem
          background-color:#43aad5
          font-size:.14rem
          color:#fff
          text-align:center
          cursor:pointer
        }
      label
        line-height:.5rem
        margin-right:.15rem
        width:.8rem
        display:inline-block
        height:.5rem
        text-align:right
      input
        padding:0 .1rem
        width:3.5rem
        height:.5rem
        border:.01rem solid #c6c6c6
        border-radius:.06rem
</style>
