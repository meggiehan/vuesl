<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        index: 0
      }
    }
  }
</script>
<style lang="stylus">
    #app
      padding-top:1px
      margin-top:-1px
</style>
