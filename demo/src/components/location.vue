<template>
	 <div class="haa">
     <div class="s-lis clearfloat">
    <label for="">省份：</label>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="isshowprv = !isshowprv">{{text1}}</p>
      <p class="s-down" @click="isshowprv = !isshowprv"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshowprv">
        <li class="ellipsis" v-for="(i,idx) in address" v-bind:class="{active:idx == index}" @click="selectprv(i)">{{i.name}}</li>
      </ul>
    </div>
  </div>

    <div class="s-lis clearfloat">
    <label for="">城市：</label>
    <div class="s-part f-l">
      <p class="p-title ellipsis" @click="isshowcity = !isshowcity">{{text2}}</p>
      <p class="s-down" @click="isshowcity = !isshowcity"><span class="trangle"></span></p>
      <ul class="list-role" v-show="isshowcity">
        <li class="ellipsis" v-for="(i,idx) in citys" v-bind:class="{active:idx == index}" @click="selectcity(i)">{{i.name}}</li>
      </ul>
    </div>
  </div>

  <div class="s-list">
    <label for="">详细地址：</label>
    <input type="input" v-model="val" :placeholder="child.holder" @input="change()">
  </div> 
   </div>

</template>

<script>
  import api from '../api/api.js'
  export default {
    name: 'location',
    props: {
      child: ''
    },
    data () {
      return {
        index: -1,
        isshowprv: false,
        isshowcity: false,
        address: {},
        citys:[],
        selectedcity: '',
        selectedprv: '',
        cityId: 1,
        prvId: 1,
        val: '',
        text1:'请选择省',
        text2: '请选择市'
      }
    },
    mounted () {
      api.getJson('../../../static/address.json').then((json) => {
        this.address=json.body.data
      })
    },
    methods: {
      selectprv (i) {
        this.isshowprv = !this.isshowprv
        this.citys = []
        this.selectedcity = ''
        this.selectedprv = i.name
        this.citys = i.city
        this.text1 = i.name
        this.text2 = '请选择市'
        this.prvId = i.id
        this.$emit('toparent', {name: this.selectedprv, val: this.prvId})
      },
      selectcity (i)  {
        this.isshowcity = !this.isshowcity
        this.selectedcity = i.name
        this.cityId = i.id
        this.$emit('toparent', {name: this.selectedcity, val: this.cityId})
        this.text2 = i.name
      },
      change() {
        this.$emit('toparent', {name: 'location' , val: this.val})
      }
    }
  }
</script>

<style scoped lang="stylus">
.haa
  width:1119px;
  float:right;
  // transform: translateY(0);
  .s-lis
    width:50%
    float:left;
    padding: .1rem 0
    label
      line-height:.5rem
      margin-right:.23rem
      width:.8rem
      display:inline-block
      height:.5rem
      text-align:right
      float: left
  .s-part
    height: .5rem
    border-radius: .06rem
    border: .01rem solid #c6c6c6
    width: 3.5rem
    position: relative
    padding: 0 0 0 .1rem
    color: #2e2e3d
    cursor: pointer
    .s-down
      width: .5rem
      height: .25rem
      line-height: .25rem
      position: absolute
      top: .125rem
      right: 0
      border-left: .01rem solid #5f6060
      .trangle
        width: 0;
        height: 0;
        position: absolute
        left: 50%
        margin-left: -.03rem
        top: 50%
        margin-top: -.03rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-top: .06rem solid #5f6060
    .p-title
      margin-right: .5rem
      margin-top: .125rem
      height.25rem
      line-height: .25rem
    .list-role
      position: absolute
      width: 100%;
      top: .55rem
      border: .01rem solid #dbdbdb
      left: 0
      background: #fff
      border-radius: .03rem
      z-index : 100
      &:before
        width: 0;
        height: 0;
        position: absolute
        top: -.06rem
        right: .15rem
        border-left: .06rem solid transparent
        border-right: .06rem solid transparent
        border-bottom: .06rem solid #5f6060
      li
        width: 100%
        height: .4rem
        line-height: .4rem
        padding: 0 .1rem
        z-index : 100
        &.active
          background: #dfeaed
        &:hover
          background: #dfeaed
  .s-list
      float: left
      overflow:hidden
      padding:.1rem 0
      // text-align: justify
      // text-align-last: justify
      // text-justify: inter-ideograph
      label
        line-height:.5rem
        margin-right:.15rem
        width:.8rem
        display:inline-block
        height:.5rem
        text-align:right
      input
        width: 9.11rem;
        padding:0 .1rem
        // width:3.5rem
        height:.5rem
        border:.01rem solid #c6c6c6
        border-radius:.06rem
</style>