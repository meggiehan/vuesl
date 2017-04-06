<template>
  <div class="manage">
    <div class="wrap-panel">
      <ul class="tab-panel">
        <li v-for="(item,idx) in list.slice((page-1)*5,page*5)" v-bind:class="{active:(idx+(page - 1) * 5)=== index }" @click="change(idx)"><span>{{item.title}}</span></li>
      </ul>
      <ul class="tab-page" v-if="list.length>5">
        <li @click="prev()"><</li>
        <li @click="next()">></li>
      </ul>
    </div>
    <div class="render">
      <ul class="render-list">
        <li v-for="(item,idx) in list[index].child"><p class="choice" v-bind:class="{active: tdx.indexOf(item.id)>-1}" @click="insert(list[index], idx, item.id)"><span></span></p>{{item.title}}</li>
      </ul>
      <div class="select-all" v-if="false">
        <p class="choice" @click="selectall()" v-bind:class="{active:tdx.length===list[index].child.length}"><span></span></p>全选
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'manage',
    props: {
      child: ''
    },
    data () {
      return {
        updata: {},
        page: 1,
        index: 0,
        tdx: [],
        is_all: {},
        list: [
          {name: 'system', title: '用户绑定', child: [{name: 'brand', id: 'fcd91dbe-c501-4fab-bee4-7cb1daef3c4f', title: '品牌'}, {name: 'brand', id: 'fc421dbe-c501-4fab-bee4-7cb1daef3c4f', title: '分类'}, {name: 'brand', id: 'fcd91dbe-c501-4fab-bee4-7cb1daef3c0f', title: 'size'}, {name: 'brand', id: 'fcd91dbe-c501-3fab-bee4-7cb1daef3c4f', title: '品牌'}, {name: 'brand', id: 'fcd91dbe-c541-4fab-bee4-7cb1daef3c4f', title: '管理'}]},
          {name: 'goods', title: '功能绑定', child: [{name: 'brand', id: 'fcd91dbe-c501-4fab-bee4-7cb1daef2c4f', title: '商品'}, {name: 'brand', id: 'fcd71dbe-c501-4fab-bee4-7cb1daef3c4f', title: '分类'}, {name: 'brand', id: 'fcd91dbe-c501-4fab-bee4-7cb1daef3c9f', title: 'size'}, {name: 'brand', id: 'fcd91dbe-c501-2fab-bee4-7cb1daef3c4f', title: '品牌'}, {name: 'brand', id: 'fcd91dbe-c521-4fab-bee4-7cb1daef3c4f', title: '666'}]}
        ]
      }
    },
    methods: {
      prev () {
        if (this.page > 1) {
          this.page--
          this.index = (this.page - 1) * 5
          this.tdx = this.updata[this.list[this.index].name] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].name])) : []
        }
      },
      next () {
        let all = Math.ceil(this.list.length / 5)
        if (this.page < all) {
          this.page++
          this.index = (this.page - 1) * 5
          this.tdx = this.updata[this.list[this.index].name] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].name])) : []
        }
      },
      selectall () {
        let tlength = this.tdx.length
        let alllength = this.list[this.index].child.length
        this.tdx = []
        this.is_all[this.list[this.index].name] = false
        if (tlength !== alllength) {
          this.is_all[this.list[this.index].name] = true
          this.list[this.index].child.map((val) => {
            this.tdx.push(val.id)
          })
        }
        this.updata[this.list[this.index].name] = JSON.parse(JSON.stringify(this.tdx))
      },
      change (idx) {
        this.index = (this.page - 1) * 5 + idx
        this.tdx = this.updata[this.list[this.index].name] ? JSON.parse(JSON.stringify(this.updata[this.list[this.index].name])) : []
      },
      combine (temp) {
        let result = ''
        for (let item in temp) {
          if (temp[item].length > 0) {
            result += temp[item].join(',') + ','
          }
        }
        result = result.substring(0, result.length - 1)
        return result
      },
      insert (data, idx, id) {
        this.tdx = this.updata[data.name] ? JSON.parse(JSON.stringify(this.updata[data.name])) : []
        let im = this.tdx.indexOf(id)
        if (im === -1) {
          this.tdx.push(id)
        } else {
          this.tdx.splice(im, 1)
        }
        this.updata[data.name] = JSON.parse(JSON.stringify(this.tdx))
        console.log(this.updata)
        this.$emit('toparent', {name: this.child.name, val: this.combine(JSON.parse(JSON.stringify(this.updata)))})
      }
    }
  }
</script>

<style scoped lang="stylus">
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
  .manage
    .wrap-panel
      position:relative
      border-bottom:.01rem solid #858689
    .tab-page
      width:.75rem
      position:absolute
      right:0
      top:0
      height:.6rem
      font-size:0
      li
        display:inline-block
        width:.25rem
        height:.25rem
        border:.01rem solid #fea525
        margin-top:.2rem
        border-radius:.03rem
        cursor:pointer
        text-align:center
        line-height:.23rem
        font-size:.18rem
        &:last-child
          margin-left:.08rem
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
      .select-all
        border-top:.01rem solid #858689
        height:.8rem
        line-height:.8rem
        margin-top:.15rem
      .render-list
        li
          height:.55rem
          line-height:.55rem
</style>
