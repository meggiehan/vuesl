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
        <div class="delete" @click="delIdlist(index)">-</div>
      </div>
      <div class="title-list">
        <div class="search-add">
          <input type="text" v-model="val" @input="addlist()">
          <button class="add-btn">+</button>
          <ul class="add-list" v-if="listmore.length>0">
            <li class="ellipsis" v-for="item in listmore" @click="addItem(item)">{{item.Name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="traggle" v-if="traggle"></div>
    <div class="opt">
      <button class="addSku" @click="addSku">添加规格</button>
    </div>
    <table class="tablelist" v-if="result.length>0">
      <thead>
        <tr>
          <td>序号</td>
          <td v-for="item in column">{{item.name}}</td>
          <td width=15>重量</td>
          <td width=15>价格</td>
          <td>图片上传</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td v-for="(it,idx) in column" class="sg">
            <div class="selectsingle">
              <p class="opendown ellipsis" @click="showlist(it.id)">{{tempName[it.id]?tempName[it.id]:selfAdd[idx].sons[0].Name}} <span>+</span></p>
              <ul class="downlist" v-if="showdown[it.id]">
                <li class="ellipsis" @click="addTemp(idx, selfAdd[idx], index, item.Name, it.id)" v-for="(item,index) in selfAdd[idx].sons">{{item.Name}}</li>
              </ul>
            </div>
          </td>
          <td><p class="i-put"><input type="text" v-model="tempweight" @input="putTemp('weight')"></p></td>
          <td><p class="i-put"><input type="text" v-model="tempaccount" @input="putTemp('account')"></p></td>
          <td><button class="option">上传</button></td>
          <td><button class="option" @click="addSingle()">添加</button></td>
        </tr>
        <tr class="list-map" v-for="(item,idx) in result">
          <td>{{idx+1}}</td>
          <td v-for="it in column"><span v-for="im in item"><i v-if="im.pid === it.id">{{im.name}}</i></span></td>
          <td><p class="i-put"><input type="text" v-model="item[0].weight"></p></td>
          <td><p class="i-put"><input type="text" v-model="item[0].account"></p></td>
          <td><button class="option">上传</button></td>
          <td><button class="option" @click="delSingle(idx)">删除</button></td>
        </tr>
    
      </tbody>
    </table>
  </div>
</template>
<script>
  import api from '../../api/api.js'
  import { mapActions } from 'vuex'
  export default {
    name: 'baseinfo',
    data () {
      return {
        skuList: [], //初次请求规格列表
        totalList: [], //为笛卡尔乘积时规格组合数值
        idList: [],  //单个规格数组
        column: [], //表格thead数值
        result: [], //已笛卡尔乘积规表格生成规格组合数值数值
        listmore: [], //下拉请求
        selfAdd: [],
        showdown: {},
        val: '',
        tempsingle: [],
        tempName: {},
        checklist: [], //检测规格是否存在数组
        tempaccount: '',
        tempweight: '',
        traggle: true
      }
    },
    beforeMount () {
      api.getJson('../../static/sku.json').then((item) => {
        this.skuList = item.body.data
        let len = this.skuList.length
        for (let i = 0; i < len; i++) {
          this.idList.push([])
        }
      })
    },
    methods: {
      ...mapActions(['notice']),
      throttle (method, context) {
        clearTimeout(method.t)
        method.t = setTimeout(() => {
          method.call(context)
        }, 500)
      },
      putTemp (name) {
        this.tempsingle.forEach((val) => {
          val.account = this.tempaccount
          val.weight = this.tempweight
        })
      },
      addTemp (index, im, idx, name, id) {
        this.tempName[id] = name
        let item = JSON.parse(JSON.stringify(im))
        this.tempsingle[index] = JSON.parse(JSON.stringify({
          pid: item.Id,
          pname: item.Name,
          id: item.sons[idx].Id,
          name: item.sons[idx].Name,
          account: this.tempaccount,
          weight: this.tempweight
        }))
        console.log('sassdsa', this.tempsingle[index])
        this.showdown[id] = !this.showdown[id]
        this.traggle = !this.traggle
      },
      addSingle () {
        // console.log('checklist', this.checklist)
        let tempcheck = ''
        this.tempsingle.forEach((val) => {
          tempcheck += val.id
        })
        console.log('sasa', this.tempsingle)
        if (this.checklist.indexOf(tempcheck) === -1) {
          this.result.unshift(JSON.parse(JSON.stringify(this.tempsingle)))
          this.checklist.unshift(tempcheck)
          return
        }
        this.notice({msg: '请不要重复添加', type: 'error'})
      },
      showlist (id) {
        this.showdown[id] = !this.showdown[id]
        this.traggle = !this.traggle
      },
      //生成规格组合笛卡尔乘积
      descartes () {
        if (arguments.length < 2 ) {
          let result = []
          arguments[0].forEach((val, idx) => {
            this.checklist.push(val.id.toString())
            result.push([val])
          })
          return result
        }
        return [].reduce.call(arguments, (col, set) => {
          let res = []
          col.forEach((c) => {set.forEach((s) => {
              var t = [].concat( Array.isArray(c) ? c : [c] )
              t.push(JSON.parse(JSON.stringify(s)))
              let temps = ''
              console.log('tmd', t)
              t.forEach((val,idx) => {
                temps += val.id
              })
              this.checklist.push(temps)
              // console.log()
              res.push(JSON.parse(JSON.stringify(t)))
          })})
          return res
        })
      },
      //请求sku
      addlist () {
        this.throttle(this.getJson, this)
      },
      //请求规格下拉列表
      getJson () {
        if (this.val == '') {
          this.listmore = []
          return
        }
        api.getJson('../../static/skumore.json').then((item) => {
          this.listmore = item.body.data
        })
      },
      //判断是否存在规格列表
      checkHas (data) {
        let result = true
        this.skuList.forEach((value, index) => {
          if (data.Id === value.Id) {
            result = false
            return
          }
        })
        return result
      },
      //下拉规格选择添加
      addItem (item) {
        if (this.checkHas(item)) {
           this.skuList.push(item)
           this.idList.push([])
        }
        this.listmore = []
        this.val = ''
      },
      //生成sku表格
      addSku () {
        let temp = JSON.parse(JSON.stringify(this.totalList))
        temp.forEach((value, idx) => {
          if (!value || value.length === 0) {
            temp.splice(idx, 1)
          }
        })
        console.log('temp', temp)
        if (!temp || temp.length === 0 || temp[0].length === 0) return
        this.checklist = []
        this.result = this.descartes(...temp)
        this.column = []
        this.result[0].forEach((val, idx) => {
          this.column.push({name: val.pname, id: val.pid})
        })
        this.addSelf()
        // this.result = JSON.parse(JSON.stringify(temp_result))
        // console.log(1233434, this.descartes(...temp))
      },
      //生成sku表格自定义组合规格添加
      addSelf () {
        this.selfAdd = []
        this.showdown = {}
        this.tempsingle = []
        this.column.forEach((value) => {
          this.showdown[value.id] = false
          this.skuList.forEach((val) => {
            if (value.id === val.Id) {
              this.selfAdd.push(val)
              let temp = {
                id: val.sons[0].Id,
                name: val.sons[0].Name,
                pid: val.Id,
                pname: val.Name,
                account: this.tempaccount,
                weight: this.tempweight
              }
              this.tempsingle.push(temp)
              this.tempName[value.id] = val.sons[0].Name
              return
            }
          })
        })
        console.log('serdfs', this.tempsingle)
      },
      //选择单个规格添加
      addTotal (idx, pid, pname, son) {
        let temp = {
          pid: pid,
          pname: pname,
          name: son.Name,
          id: son.Id,
          account: '',
          weight: ''
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
        // console.log('asaskdjhjhajasjkas', this.totalList)
      },
      //删除选择规格列表
      delIdlist (idx) {
        this.skuList.splice(idx,1)
        this.totalList.splice(idx, 1)
        this.idList.splice(idx, 1)
        this.idList.push([])
        console.log(idx, this.totalList)
      },
      //删除表格列表
      delSingle (idx) {
        this.result.splice(idx ,1)
        this.checklist.splice(idx, 1)
      },
      //检测单个规格参数选择时是否已存在
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
      margin-bottom:.4rem
      border:.01rem solid #ccc
      border-collapse:collapse
      .i-put
        padding:0 .05rem
        input
          // width:100%
          border-radius:.06rem
          height:.4rem
          border:.01rem solid #ccc
      .sg
        padding:.05rem
      .selectsingle
        width:100%
        height:100%
        border-radius:.06rem
        border:.01rem solid #ccc
        position:relative
        .downlist
          width:100%
          position:absolute
          top:.43rem
          border-radius:.06rem
          border:.01rem solid #ccc
          background:#fff
          li
            height:.4rem
            padding:0 .05rem
            line-height:.4rem
            border-bottom:.01rem solid #ccc
            &:hover
              background:#999
            &:last-child
              border:0
        .opendown
          width:100%
          height:100%
          line-height:.4rem
          cursor:pointer
          position:relative
          span
            position:absolute
            top:.08rem
            border-left:.01rem solid #ccc
            right:0
            height:.25rem
            font-size:.2rem
            line-height:.25rem
            width:.25rem
            color:#3b95c2
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
            user-select:none
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
          .add-list
            position:absolute
            width:2.3rem
            top:.52rem
            left:0
            background:#fff
            border:.01rem solid #ccc
            border-radius:.06rem
            li
              height:.5rem
              line-height:.5rem
              padding:0 .1rem
              border-bottom:.01rem solid #ccc
              cursor:pointer
              &:hover
                background:#ccc
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
