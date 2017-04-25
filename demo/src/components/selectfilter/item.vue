<template>
<div>
    <div class="wrap" @click='chose'>
<!-- 　　class="fa-file-text" -->
         <i v-if='isFolder' class="tran" :class="[open?'tran-down':'tran']" @click.stop='toggle'></i>
    　<!--isFolder判断是否存在子级改变图标-->
         <i v-if='!isFolder' ></i>{{model.Category_name}}
     </div>
     <ul v-show="open" v-if='isFolder'>
          <items v-for='cel in model.child' :model='cel'></items>
     </ul>
 </div>
</template>

<script>
import items from "./item.vue";
export default {
        name: 'items',
        props: {
            model: {}
        },
        components: {},
        data() {
            return {
                open: false,
            }
        },
        computed: {
            isFolder: function() {
                return this.model.child && this.model.child.length
                console.log(isFolder)
            }
        },
        mounted(){
            console.log(isFolder)
        },
        methods: {
            toggle: function() {
                console.log(this.isFolder)
                if(this.isFolder) {
                    this.open = !this.open
                }
            },
            chose: function () {
                this.$emit('select',{Category_name: this.model.Category_name,id:this.model.id})
            }
        }
    }
</script>

<style scoped lang="stylus">
  .wrap
    width: 100%
    height: .4rem
    line-height: .4rem
    padding: 0 .1rem
    z-index : 100
    position: relative
    &.active
     background: #dfeaed
    &:hover
     background: #dfeaed
    .tran
     width: 0;
     height: 0;
     position: absolute
     right: 0.15rem
     margin-left: -.03rem
     top: 50%
     margin-top: -.03rem
     border-left: .06rem solid transparent
     border-right: .06rem solid transparent
     border-top: .06rem solid #5f6060
  ul
    padding-left: 0.2rem   
</style>