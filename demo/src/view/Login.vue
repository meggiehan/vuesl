<template>
  <div id="login">
    <div class="login-title">
      <img src="../assets/logo-l.png" alt="">
    </div>
    <div class="login-form">
      <div class="form-wrap">
        <input type="text">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  #login
    .login-title
      text-align:center
      margin-top:1.55rem
      img
        vertical-align:top
    .login-form
      width:6rem
      height:4rem
      margin:.7rem auto 0
      background:#fff
      border-radius:.08rem
      border:.01rem solid #9d9d9d
      padding:.65rem .49rem 0
      .form-wrap
        input
         

</style>
