<!--提示文本部件-->
<template>
  <div class="parame">
      <div class="parame-list clearfloat">
        <div class="title">
          商品参数名称
        </div>
        <div class="info">
          商品参数名值
        </div>
      </div>
      <div class="parame-list clearfloat">
        <div class="title p-name">
          <input type="text" class="set-name">
          <button class="add">+</button>
        </div>
        <div class="info">
          <input type="text" class="set-value">
          <button class="minus">-</button>
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
<style scoped lang="stylus">
  .parame
    margin:0 .9rem 0
    padding-top:1px
    .parame-list
      .title
        width:20%
        float:left
        line-height:.5rem
        height:.5rem
        position:relative
        .add
          position:absolute
          width:.4rem
          height:.21rem
          line-height:.2rem
          border:0
          border-left:.01rem solid #999
          top:.15rem
          right:0rem
          font-size:.25rem
          color:#6fadcf
          background:none
        .set-name
          width:100%
          height:.5rem
          border:.01rem solid #999
          border-radius:.06rem
          padding-right:.42rem
      .info
        width:60%
        float:left
        margin-left:10%
        text-align:center
        line-height:.5rem
        height:.5rem
        position:relative
        .minus
          width:.24rem
          height:.24rem
          border-radius:50%
          border:.01rem solid #999
          position:absolute
          top:.13rem
          font-size:.2rem
          background:none
          right:-.45rem
        .set-value
          width:100%
          height:.5rem
          border:.01rem solid #999
          border-radius:.06rem
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

</style>
