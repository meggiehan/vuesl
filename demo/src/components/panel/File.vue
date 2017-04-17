<template>
	<div class="filecontent">
		<label for="">
			合同扫描照：
		</label>
		<input type="input" name="" id="" value="" class="arrt" />
		<a href="javascript:;" class="file">浏览
        <input type="file" :accept="accepts" v-bind="val"  @input="change()" >
        <slot></slot>
    	</a>
	</div>
	
</template>

<script>
	/* eslint-disable */
	import { mapGetters } from 'vuex'
	export default {
        name : 'MoUpload',
        props : {
        	child: '',
            accepts : { //允许的上传类型
                type : String,
                default : 'image/jpeg,image/jpg,image/png,image/gif'
            },
            flag : [String, Number], 
            maxSize : {
                type : Number,
                default : 0 
            }
        },
        data () {
		    return {
		      val: ''
		    }
		  },
	    computed: {
	    ...mapGetters(['single'])
	  },
	  mounted () {
	    this.val = this.single[this.child.name] || ''
	    this.$emit('toparent', {name: this.child.name, val: this.val})
	  },
	  methods: {
	    change () {
	      if (this.child.must === 'int') {
	        this.val = Number(this.val)
	      }
	      this.$emit('toparent', {name: this.child.name, val: this.val})
	    }
	  }
    }
	
	
</script>

<style>
.filecontent input{
	width: 3.5rem;
    border:.01rem solid #c6c6c6;
    height: 0.5rem;
    border:.01rem solid #C6C6C6;
    border-radius: .06rem;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: .2rem;
    left: -.7rem;
    top: .1rem;
}
.file label{
	position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}

</style>