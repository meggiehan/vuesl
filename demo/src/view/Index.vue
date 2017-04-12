<template>
  <div class="index">
    <span>这是首页</span>
    <span>结果：{{count}}</span>
    <button @click="open()">+</button>
    <user :title="title"
          :show="show"></user>
  <confirm ref="dialog"></confirm>
  </div>
</template>

<script>
import User from '../components/user.vue'
import Confirm from '../components/Modal/Confirm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: '这是首页传入参数',
      show: true
    }
  },
  computed: {
    ...mapGetters(['count', 'modal'])
  },
  methods: {
    ...mapActions(['increment', 'alerts']),
    callback () {
      console.log(6666666666666666)
    },
    open () {
      this.$refs.dialog.confirm().then(() => {
        this.callback()
      }).catch(() => {
        console.log(22222222222)
      })
    }
  },
  components: {
    user: User,
    confirm: Confirm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
    .index
      color:blue
    button
      width:.25rem
</style>
