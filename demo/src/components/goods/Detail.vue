<!--提示文本部件-->
<template>
  <div class="detail">
    <vue-html5-editor :content="content" :auto-height="true" @change="updateData" :height="400"></vue-html5-editor>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'detail',
    data () {
      return {
        list: [],
        name:'',
        val:'',
        inst: '',
        content: ''
      }
    },
    methods: {
      ...mapActions(['notice']),
      updateData (data) {
        this.content = data
      },
      getcontent () {
        console.log(this.content)
        return this.content
      }
    }
  }

</script>
<style scoped lang="stylus">
  .text
    background:red!ipmortant
  .detail
    padding-top:.3rem
    min-height:6rem
    margin-bottom:.2rem
</style>
