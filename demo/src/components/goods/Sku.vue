<!--提示文本部件-->
<template>
  <div class="skuinfo">
    <div class="sku-title">
      <div class="title-list" v-for="(item,index) in skuList">
        <div class="list-left">
          {{item.Name}}
        </div>
        <ul class="v-list">
          <li v-for="it in item.sons" @click="addTotal(index, item.Id, item.Name, it)"><i class="choose" v-bind:class="{active:(idList[index] || []).indexOf(it.Id) >-1}"></i> {{it.Name}}</li>
        </ul>
        <div class="delete">-</div>
      </div>
      <div class="title-list">
        <div class="search-add">
          <input type="text">
          <button class="add-btn">+</button>
        </div>
      </div>
    </div>
    <div class="opt">
      <button class="addSku" @click="addSku">添加规格</button>
    </div>
    <table class="tablelist">
      <thead>
        <tr>
          <td>颜色</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr class="list-map">
          <td>黄色</td>
          <td>123</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  import api from '../../api/api.js'
  export default {
    name: 'baseinfo',
    data () {
      return {
        skuList: [],
        totalList: [],
        idList: [[], [], [], [], [], [], [], [], [], [], [], [], []]
      }
    },
    beforeMount () {
      api.getJson('../../static/sku.json').then((item) => {
        this.skuList = item.body.data
      })
    },
    methods: {
      descartes () {
        if (arguments.length < 2 ) return [arguments[0]] || [[]]
        return [].reduce.call(arguments, (col, set) => {
          let res = []
          col.forEach((c) => {set.forEach((s) => {
              var t = [].concat( Array.isArray(c) ? c : [c] )
              t.push(s)
              res.push(t)
          })})
          return res
        })
      },
      addSku () {
        let temp =JSON.parse(JSON.stringify(this.totalList))
        temp.forEach((value, idx) => {
          if (!value || value.length === 0) {
            temp.splice(idx, 1)
          }
        })
        console.log(1233434, this.descartes(...temp))
      },
      addTotal (idx, pid, pname, son) {
        let temp = {
          pid: pid,
          pname: pname,
          name: son.Name,
          id: son.Id
        }
        this.totalList[idx] = this.totalList[idx] || []
        this.idList[idx] = this.idList[idx] || []
        let exist = this.checkExist(this.totalList[idx], temp)
        if (exist === -1) {
          this.totalList[idx].push(temp)
          this.idList[idx].push(son.Id)
        } else {
          this.totalList[idx].splice(exist, 1)
          this.idList[idx].splice(exist, 1)
        }
      },
      checkExist (data, temp) {
        let result = -1
        data.forEach((val ,index) => {
          if(val.id === temp.id) {
            result = index
            return
          }
        })
        return result
      },
      add (idx) {
        this.index = idx
      }
    }
  }

</script>
<style  lang="stylus">
  .skuinfo
    margin:0 .3rem 0
    padding-top:1px
    .tablelist
      margin-top:.2rem
      width:100%
      border:.01rem solid #ccc
      border-collapse:collapse
      .list-map
        &:hover
          background:#E3E6EA
      td
        text-align:center
        height:.5rem
        border-right:.01rem solid #ccc
        border-bottom:.01rem solid #ccc
    .opt
      padding:.15rem .35rem
      button
        width:1.65rem
        height:.6rem
        border-radius:.06rem
        border:.01rem solid #3b95c2
        background:none
        font-size:.18rem
    .sku-title
      margin: .3rem 0 0
      min-height:2rem
      border:.01rem solid #c6c6c6
      border-radius:.06rem
      .title-list
        min-height:.8rem
        border-bottom:.01rem solid #ccc
        position:relative
        padding-top:1px
        &:last-child
          border:0
        .delete
          position:absolute
          width:.33rem
          height:.33rem
          border-radius:50%
          border:.01rem solid #787878
          right:1.2rem
          top:.23rem
          line-height:.31rem
          font-size:.18rem
          cursor:default
          text-align:center
        .v-list
          margin:.15rem 1.4rem 0 3.95rem
          min-height:.5rem
          font-size:0
          li
            display:inline-block
            height:.5rem
            line-height:.5rem
            font-size:.14rem
            cursor:default
            padding-right:.2rem
            .choose
              display:inline-block
              width:.25rem
              height:.25rem
              vertical-align:middle
              border-radius:50%
              margin-right:.08rem
              border:.01rem solid #474747
              position:relative
              &.active
                &:after
                  background:#f7b42c
              &:after
                content:''
                position:absolute
                width:.13rem
                height:.13rem
                top:.05rem
                left:.05rem
                background:none
                border-radius:50%
        .search-add
          width:2.3rem
          height:.5rem
          line-height:.5rem
          margin:.15rem 0 0 .25rem
          border:.01rem solid #918c89
          border-radius:.06rem
          position:relative
          input
            width:100%
            height:.48rem
            vertical-align:top
            padding:0 .42rem 0 .05rem 
            border-radius:.06rem 0 0 .06rem
          .add-btn
            position:absolute
            width:.4rem
            height:.23rem
            line-height:.23rem
            text-align:center
            color:#3a95c2
            font-size:.28rem
            border:0
            top:.13rem
            right:0
            border-left:.01rem solid #ccc
            background:#fff
        .list-left
          position:absolute
          width:2.3rem
          height:.5rem
          line-height:.5rem
          top:.15rem
          left:.25rem
          border:.01rem solid #918c89
          border-radius:.06rem
          padding: 0 .07rem
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
