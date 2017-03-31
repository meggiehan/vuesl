<!-- 筛选组装主部件 -->
<template>
 <div class="pannel">
    <p class="p-title">用户权限</p>
    <div class="wrap-panel">
      <ul class="tab-panel">
        <li v-for="(item,idx) in list.slice((page-1)*5,page*5)" v-bind:class="{active:idx === index }" @click="index=(page-1)*5+idx"><span>{{item.title}}</span></li>
      </ul>
    </div>
    <div class="render">
      <ul class="render-list">
        <li v-for="(item,idx) in list[index].child"><p class="choice" v-bind:class="{active: (updata[list[index].name] || []).indexOf(item.id)>-1}" @click="insert(list[index], idx, item.id)"><span></span></p>{{item.title}}{{list[index].name}}</li>
      </ul>
    </div>
 </div>
</template>

<script>
  export default {
    name: 'auth',
    props: {
      types: ''
    },
    data () {
      return {
        updata: {},
        page: 1,
        index: 0,
        texts: {
          quit: '退出',
          sure: '确定'
        },
        list: [
          {name: 'system', title: '系统管理', child: [{name: 'brand', id: 1, title: '品牌'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '管理'}]},
          {name: 'goods', title: '商品管理', child: [{name: 'brand', id: 1, title: '商品'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '666'}]},
          {name: 'order', title: '订单管理', child: [{name: 'brand', id: 1, title: '订单'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '管理'}]},
          {name: 'buy', title: '采购管理', child: [{name: 'brand', id: 1, title: '采购'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '管理'}]},
          {name: 'trans', title: '物流管理', child: [{name: 'brand', id: 1, title: '物流'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '管理'}]},
          {name: 'sale', title: '销售管理', child: [{name: 'brand', id: 1, title: '销售'}, {name: 'brand', id: 2, title: '分类'}, {name: 'brand', id: 3, title: 'size'}, {name: 'brand', id: 4, title: '品牌'}, {name: 'brand', id: 5, title: '管理'}]}
        ]
      }
    },
    methods: {
      insert (data, idx, id) {
        this.updata[data.name] = this.updata[data.name] || []
        let i = this.updata[data.name].indexOf(id)
        console.log(i + '&&&&&' + id)
        if (i < 0) {
          this.updata[data.name].push(id)
        } else {
          this.updata[data.name].splice(i, 1)
        }
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
    .wrap-panel
      position:relative
      border-bottom:.01rem solid #858689
    .tab-panel
      height:.6rem
      margin-right:.75rem
      li
        height:.58rem
        line-height:.58rem
        width:20%
        display:inline-block
        text-align:left
        cursor:pointer
        span
          display:inline-block
          padding:0 .04rem
        &.active
          span
            border-bottom:.03rem solid #ffa626
    .render
      border-bottom:.01rem solid #858689
      .render-list
        li
          height:.55rem
          line-height:.55rem
          .choice
            display:inline-block
            width:.25rem
            height:.25rem
            vertical-align:middle
            border-radius:50%
            border:.01rem solid #535353
            margin-right:.1rem
            line-height:.23rem
            text-align:center
            cursor:pointer
            &.active
              span
                 background:#ffa725
            span
              width:.13rem
              height:.13rem
              border-radius:50%
              display:inline-block
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

