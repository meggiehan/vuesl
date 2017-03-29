<template>
  <div class="index">
    <span>这是首页</span>
    <span>结果：{{count}}</span>
    <button @click="increment">+</button>
    <user :title="title"
          :show="show"></user>
  </div>
</template>

<script>
import User from '../components/user.vue'
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
  computed: mapGetters([
    'count'
  ]),
  methods: mapActions([
    'increment'
  ]),
  components: {
    user: User
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
