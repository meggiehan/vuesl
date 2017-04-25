<!-- 弹出层下拉部件 -->
<template>
  <div class="s-lis clearfloat">
    <label for="">{{child.text}}:</label>
    <div class="s-part f-l" contenteditable="true" spellcheck="false">
      <p contenteditable="false" spellcheck="false" class="p-title ellipsis" @click="isshow = !isshow"><span v-for="(i,idx) in selected">{{i.Category_name}},</span></p>
      <p contenteditable="false" class="s-down" spellcheck="false" @click="isshow = !isshow"><span class="trangle"></span></p>
      <!-- 下拉分级 -->
      <ul contenteditable="false" class="list-role" spellcheck="false" v-show="isshow">
        <div class="holder">
          <input type="input" :model='keywords' placeholder="请输入搜索的内容">
          <div class="selected">
            <span v-for="(i,idx) in selected" @click="deleteselect(idx)">{{i.Category_name}}/</span>
          </div>
        </div>
        <items v-for='cel in list' :model='cel' @select="addselect">{{cel.Category_name}}</items>
      </ul>
    </div>
  </div>
</template>

<script>
  import items from "./item.vue";
  import api from '../../api/api.js'
  import { mapGetters } from 'vuex'
  export default {
    name: 'selecter',
    props: {
      child: ''
    },
    data () {
      return {
        index: -1,
        isshow: false,
        keywords: '',
        list: [],
        text1:'',
        open: false,
        selected: []
      }
    },
    components: {
      items: items
    },
    computed: {
      ...mapGetters(['single']),
      isFolder: function() {
                return this.list.child && this.model.child.length
                console.log(isFolder)
            }
    },
    beforeMount () {
      api.getJson('../../../static/catalogue.json').then(item=>{
          this.list=item.body.data
      })
    },
    beforeDestroy () {
      if (this.child.get && this.parentIds.indexOf(this.child.get.url) > -1) {
        this.child.list.splice(1)
      }
    },
    methods: {
      addselect (item) {
        let isSelected = false
        for(let i = 0;i<this.selected.length;i++) {
          if(this.selected[i].id==item.id){
            console.log(this.selected[i].id)
            console.log(item.id)
            isSelected = true
          }
        }
        if(!isSelected){
          this.selected.push(item)
        }
        this.$emit('toparent',{name:this.child.name,val:this.selected})
      },
      deleteselect (idx) {
        this.selected.splice(idx,1)
        this.$emit('toparent',this.selected)
      },
      // change (idx) {
      //   this.index = idx
      //   this.isshow = !this.isshow
      //   this.text1 = this.child.list[idx].Name
      //   this.$emit('toparent', {name: this.child.name, val: this.child.list[idx].Id})
      // },
      toggle () {
          if(this.isFolder) {
              this.open = !this.open
          }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .s-lis
    padding: .1rem 0
    label
      line-height:.5rem
      margin-right:.23rem
      width:.8rem
      display:inline-block
      height:.5rem
      text-align:right
      float: left
  .s-part
    outline: none
    height: .5rem
    border-radius: .06rem
    border: .01rem solid #c6c6c6
    width: 3.5rem
    position: relative
    padding: 0 0 0 .1rem
    color: #2e2e3d
    cursor: pointer
    *
      outline: none
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
      height:.25rem
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
      .holder
        width: 100%
        padding: 20px 20px;
        box-sizing: border-box
        input
          // position: absolute
          // left: 50%
          // top: 0
          // transform: translateX(-50%)
          width: 100%
          border: .01rem solid #dbdbdb
          border-radius: 5px
          height: 3em
          font-size: 15px
          margin-bottom: 20px
        &:before
          width: 0;
          height: 0;
          position: absolute
          top: -.06rem
          right: .15rem
          border-left: .06rem solid transparent
          border-right: .06rem solid transparent
          border-bottom: .06rem solid #5f6060
</style>
