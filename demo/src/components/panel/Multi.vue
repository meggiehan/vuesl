<!-- 筛选下拉部件 -->
<template>
  <div class="clearfloat">
    <div class="s-title f-l">
      {{child.text}}：
    </div>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="slide()">{{text}}</p>
      <p class="s-down" @click="slide()"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshow">
        <li v-for="(item,idx) in child.list" v-bind:class="{active:list.indexOf(item.id)>-1}" @click="change(item.id)"><a href="javascript:;" class="m-item">{{item.title}}</a></li>
        <li class="operate clearfloat">
          <a href="javascript:;" class="btn-sure" @click="sure()">确定</a>
        </li>
      </ul>
    </div>
 </div> 
</template>

<script>
  export default {
    name: 'multi',
    props: {
      child: ''
    },
    data () {
      return {
        isshow: false,
        text: this.child.text,
        list: [],
        result: []
      }
    },
    methods: {
      slide () {
        this.isshow = !this.isshow
        this.list = JSON.parse(JSON.stringify(this.result))
        this.isshow && this.filltext()
      },
      sure () {
        this.isshow = false
        this.result = JSON.parse(JSON.stringify(this.list))
        this.filltext()
        this.$emit('toparent', {name: this.child.name, val: this.result})
      },
      filltext () {
        this.text = ''
        this.child.list.map((val) => {
          if (this.list.indexOf(val.id) > -1) {
            this.text += val.title + ','
          }
        })
        this.text = this.text.substring(0, this.text.length - 1) || this.child.text
      },
      change (id) {
        let index = this.list.indexOf(id)
        if (index === -1) {
          this.list.push(id)
        } else {
          this.list.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../lib/stylus/multi.styl'
</style>
