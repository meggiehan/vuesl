<template>
  <div class="s-radio">
    <label for="" class="label-radio">{{child.text}}：</label>
    <div class="radios" v-for="item in child.radioval">
      <input type="radio" :value="item.val" v-model="picked">
      <label for="">{{item.text}}</label>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'radioer',
  props: {
    child: ''
  },
  data () {
    return {
      picked: ''
    }
  },
  watch: {
    'picked': function (value, oldval) {
      console.log(value)
    }
  }
}
</script>

<style scoped lang="stylus">
  .s-radio
      overflow:hidden
      padding:.1rem 0
      .radios
        display:inline-block
        height:.5rem
        line-height:.5rem
        margin: 0 .12rem
        input[type="radio"]
          width:.15rem
          height: .15rem
          margin-top:.18rem
      .label-radio
        line-height:.5rem
        margin-right:.15rem
        width:.8rem
        display:inline-block
        height:.5rem
        text-align:right
</style>
