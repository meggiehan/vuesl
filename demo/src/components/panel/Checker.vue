<template>
  <div class="s-checker">
    <div class="s-title f-l">
      {{child.text}}：
    </div>
    <ul>
      <li v-for='item in child.list' @click=change(item.id)><span></span>{{item.title}}</li>
    </ul>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'checker',
    props: {
      child: ''
    },
    data () {
      return {
        text: this.child.text
      }
    },
    computed: {
      ...mapGetters(['single'])
    },
    mounted () {
      let temp = this.single[this.child.name] ? this.single[this.child.name].split(',') : []
      this.result = JSON.parse(JSON.stringify(temp))
      this.list = JSON.parse(JSON.stringify(temp))
      this.$emit('toparent', {name: this.child.name, val: this.result})
    },
    methods: {
      filltext () {
        this.text = ''
        this.child.list.map((val) => {
          if (this.list.indexOf(val.Id) > -1) {
            this.text += val.Name + ','
          }
        })
        this.text = this.text.substring(0, this.text.length - 1) || this.child.text
      },
      change (id) {
        console.log('哈哈', this)
        let index = this.list.indexOf(id)
        if (index === -1) {
          this.list.push(id)
        } else {
          this.list.splice(index, 1)
        }
        this.$emit('toparent', {name: this.child.name, val: this.list})
      }
    }
  }
</script>
<style scoped lang="stylus">
  .s-checker
    height: .7rem
    line-height: .7rem
    padding: .1rem 0
    .s-title
       padding-left: .32rem
  li
    display: inline-block
    margin-left: .3rem
    height: .5rem
    line-height: .5rem
  span
    width: .2rem
    height: .2rem
    display: inline-block
    border: .02rem solid #23330e
    margin: 0 .1rem
    border-radius: 50%
    vertical-align: middle
</style>
