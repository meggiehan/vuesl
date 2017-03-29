<template>
  <div class="s-list">
    <label for="">{{child.text}}：</label>
    <input v-if="child.sub === 'input'" type="input" v-model="val" :placeholder="child.holder" >
    <input v-if="child.sub === 'password'" type="password" v-model="val" :placeholder="child.holder" >
    <input v-if="child.sub === 'email'" type="email" v-model="val" :placeholder="child.holder" >
    <input v-if="child.sub === 'date'" type="date" v-model="val" :placeholder="child.holder" >
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'inputer',
  props: {
    child: ''
  },
  data () {
    return {
      val: ''
    }
  },
  watch: {
    'val': function (value, oldval) {
      this.$emit('topanel', {name: this.child.name, val: this.val})
    }
  }
}
</script>

<style scoped lang="stylus">
  .s-list
      overflow:hidden
      padding:.1rem 0
      label
        line-height:.5rem
        margin-right:.25rem
        width:.8rem
        text-align:justify
      input
        padding:0 .1rem
        width:3.5rem
        height:.5rem
        border:.01rem solid #c6c6c6
        border-radius:.06rem
</style>
