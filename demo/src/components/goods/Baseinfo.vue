<!--提示文本部件-->
<template>
  <div class="baseinfo">
    <div class="base-line">
      <div class="s-part f-r">
          <p class="p-title ellipsis" @click="isshow = !isshow">选择单位</p>
          <p class="s-down" @click="isshow = !isshow"><span class="trangle"></span></p>
          <ul class="list-role" v-show="isshow">
            <li class="ellipsis" v-for="(i,idx) in list" v-bind:class="{active:idx == index}" @click="add(idx)">{{i.Name}}</li>
          </ul>
      </div>
      <div class="line-form goods-title">
        <div class="line-title">
          商品名称：
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="base-line clearfloat">
      <div class="line-form f-l wd">
        <div class="line-title">
          商品型号：
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
      <div class="line-form f-l wd">
        <div class="line-title">
          商品型号：
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          所属品牌：
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          商品目录：
        </div>
        <div class="forminput cat" contenteditable="true">
          
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          V联价：
        </div>
        <div class="forminput cat" contenteditable="true">
          
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'baseinfo',
    data () {
      return {
        isshow: false,
        index: -1,
        list: [{Name: '大码', Id: 121}, {Name: '中码', Id: 1212}, {Name: '小码', Id: 1211}]
      }
    },
    methods: {
      add (idx) {
        this.index = idx
      }
    }
  }

</script>
<style  lang="stylus">
  .s-part
      height: .5rem
      border-radius: .06rem
      border: .01rem solid #c6c6c6
      width: 1.7rem
      position: relative
      padding: 0 0 0 .1rem
      color: #2e2e3d
      cursor: pointer
      .s-down
        width: .5rem
        height: .25rem
        line-height: .25rem
        position: absolute
        top: .125rem
        right: 0
        border-left: .01rem solid #5f6060
        .trangle
          width: 0;
          height: 0;
          position: absolute
          left: 50%
          margin-left: -.03rem
          top: 50%
          margin-top: -.03rem
          border-left: .06rem solid transparent
          border-right: .06rem solid transparent
          border-top: .06rem solid #5f6060
      .p-title
        margin-right: .5rem
        margin-top: .125rem
        height.25rem
        line-height: .25rem
      .list-role
        position: absolute
        width: 100%;
        top: .55rem
        border: .01rem solid #dbdbdb
        left: 0
        background: #fff
        border-radius: .03rem
        z-index : 100
        &:before
          width: 0;
          height: 0;
          position: absolute
          top: -.06rem
          right: .15rem
          border-left: .06rem solid transparent
          border-right: .06rem solid transparent
          border-bottom: .06rem solid #5f6060
        li
          width: 100%
          height: .4rem
          line-height: .4rem
          padding: 0 .1rem
          z-index : 100
          &.active
            background: #dfeaed
          &:hover
            background: #dfeaed
  .baseinfo
    margin:0 .9rem 0
    padding-top:1px
    .base-line
      position:relative
      margin:0 0 .36rem
      &:first-child
        margin-top:.16rem
      .line-form
        min-height:.5rem
        &.wd
          width:50%
        &.goods-title
          margin-right:1.8rem
        .forminput
          border:.01rem solid #918c89
          border-radius:.06rem
          overflow:hidden
          margin-left:1.3rem
          &.cat
            min-height:.5rem
            max-height:1.3rem
            overflow-y:auto
            line-height:.48rem
          input
            width:100%
            height:.48rem
            vertical-align:top
            border-radius:.06rem
            padding:0 .06rem
            font-size:.18rem
        .line-title
          width:1.2rem
          text-align:right
          position:absolute
          line-height:.5rem
          height:.5rem
          font-size:.18rem

</style>
