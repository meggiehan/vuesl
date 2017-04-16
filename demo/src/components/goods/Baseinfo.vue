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
        <div class="forminput cat" contenteditable="true" @focus="showcat()">
          <div class="catelist">
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="base-line clearfloat">
      <div class="line-form f-l w3">
        <div class="line-title">
          V联价：
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
      <div class="line-form f-l w3">
        <div class="line-title">
          现金
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
      <div class="line-form f-l w3">
        <div class="line-title">
          市场
        </div>
        <div class="forminput">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          商品图片：
        </div>
        <div class="forminput file-input">
          <input type="file" @change="upload">
        </div>
        <div class="file-text">选择图片</div>
      </div>
    </div>
    <div class="img-list">
      <ul class="clearfloat">
        <li v-for="item in url"><img :src="item" alt=""></li>
      </ul>
      <p class="img-text">第一张为缩略图，建议为正方形图片，其它为详情页图片，尺寸建议宽带为800，并保持图片大小一致，您可以拖动图片改变其顺序。</p>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          商品属性：
        </div>
        <div class="forminput noborder">
          <ul class="select">
            <li><span></span>推荐</li>
            <li><span></span>新品</li>
            <li><span></span>热卖</li>
            <li><span></span>包邮</li>
            <li><span></span>不参加会员折扣</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          重量：
        </div>
        <div class="forminput weight">
          <input type="text">
        </div>
      </div>
    </div>
    <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          运费类型：
        </div>
        <div class="forminput noborder">
          <ul class="select">
            <li><span></span>按重量计算</li>
            <li><span></span>按地区计算</li>
          </ul>
        </div>
      </div>
      </div>
      <div class="base-line">
      <div class="line-form">
        <div class="line-title">
          上/下架：
        </div>
        <div class="forminput noborder">
          <ul class="select">
            <li><span></span>上架</li>
            <li><span></span>下架</li>
          </ul>
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
        url: [],
        list: [{Name: '大码', Id: 121}, {Name: '中码', Id: 1212}, {Name: '小码', Id: 1211}],
        cate: []
      }
    },
    methods: {
      showcat () {
        console.log(12121212)
      },
      getObjectURL (file) {
        let url = null
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) {
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      upload (e) {
        // e.preventDefault()
        this.url.push(this.getObjectURL(e.target.files[0]))
        console.log('msdmsd', e.target.files || e.dataTransfer.files)
      },
      add (idx) {
        this.isshow = false
        this.index = idx
      }
    }
  }

</script>
<style  lang="stylus">
  .catelist
    margin-top:.48rem
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
        &.w3
          width:33.33%
        &.goods-title
          margin-right:1.8rem
        .forminput
          border:.01rem solid #918c89
          border-radius:.06rem
          overflow:hidden
          margin-left:1.3rem
          &.file-input
            margin-right:1.7rem
            background:#e9e9e9
            border-right:.01rem solid #e9e9e9
            position:relative
            z-index:66
            input[type="file"]
              opacity:0
          &.weight
            width:3.35rem
          &.noborder
            border:0
          .select
            li
              float:left
              height:.5rem
              line-height:.5rem
              padding-right:.15rem
              span
                display:inline-block
                width:.16rem
                height:.16rem
                vertical-align:middle
                border:.01rem solid #999
                border-radius:50%
                margin-right:.1rem
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
        .file-text
          width:1.78rem
          position:absolute
          top:0
          right:0
          text-align:center
          height:.5rem
          line-height:.5rem
          border:.01rem solid #918c89
          border-radius:.06rem
  .img-list
    margin-left:1.2rem
    margin-top:.15rem
    margin-bottom:.36rem
    p
      margin-top:.2rem
    li
      float:left
      width:1.1rem
      height:1.1rem
      margin-right:.05rem
      img
        width:100%
        height:100%
</style>
