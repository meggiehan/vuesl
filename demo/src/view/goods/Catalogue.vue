<template>
  <div class="wrap">
  	<tip :parent="nav.parent"
  		 :child="nav.child"></tip>
  	<div class="role main">
  		<filters :filters="filters"
  				 :method="method"></filters>
  		<div class="option">
  			<button class="btn" @click="create('panel')">创建目录</button>
  		</div>	
  		<tables :method="method"
  		        :column="column"
  		        :options="options"
  		        :filter="filters"
  		        :list="level1"></tables>
  	</div>
  	<transition name="slide-fade">
  	  <panel :panels="panels" :types="types" @close="close('panel')" v-if="show.panel">
  	  	<span slot='title'>{{title}}</span>
  	  </panel>	
  	</transition>
  	<confirm ref="dialog" :msg="confirms"></confirm>	
  </div>
</template>

<script>
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import Confirm from '../../components/Modal/Confirm.vue'
import api from '../../api/api.js'
import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Catalogue',
    data () {
    	return {
    		cataloguedata: [],
    		level1: [],
    		level2: [],
    		level3: [],
    		confirms: {
    			title: '提示',
    			body: '确认删除?'
    		},
    		show: {
    			panel: false,
    			auth:　false
    		},
    		nav: {
    			parent: '商品管理',
    			child: '商品目录'
    		},
    		title: '',
    		method: {
    			list: this.level1
    		},
    		filters: [
    		   {name: 'Search', size: 'big', type: 'input', val: ''},
    		   {name: 'GoodsRank', size: 'small', type: 'select',text: '分类级别', val: '',list:[
    		   		{name: 'firstLevel', title: '一级分类', id: '001'},
    		   		{name: 'secondLevel', title: '二级分类', id: '002'},
    		   		{name: 'thirdLevel', title: '三级分类', id: '003'}
    		   	]}
    		],
    		column: [
    		   {text: '序号', name: 'Disp_index'},
    		   {text: '分类名称', name: 'Category_name'},
    		   {text: '商品数量', name: 'Goods_quantity'}, 
    		   {text: '所占商品比例', name: 'Goods_proportion'},
    		   {text: '分类级别', name: 'Goods_rank'},
    		   {text: '最后操作时间', name: 'Create_time'},
    		],
    		options: [
    		   {name: '编辑', method: this.edit}
    		],
    		panels: [
    		  {name: 'CatalogueName', text: '名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null' },
    		  {name: 'ParentClass', text: '父分类', type: 'select', sub: 'select'},
    		  {name: 'KeyWords', text: '关键词', holder: '请输入关键词', type: 'input', sub: 'input',check: 'is_null'},
    		  {name: 'No', text: '排序',holder: '请输入序号...', type: 'input', sub: 'input', check: 'is_null'},
    		],
    		types: [{name: 'quit', text: '退出'},{name: 'save', text: '保存'}]
    	}
    },
    mounted() {
    	// console.log('hahaha',api.getJson('../../../static/catalogue.json'))
    	api.getJson('../../../static/catalogue.json').then((json)=>{
    		this.cataloguedata = json.body.data
    		// console.log('hahaha',this.cataloguedata)
    	}).then(()=>{
    		for (let i = 0 ; i < this.cataloguedata.length; i++) {
    			this.level1.push(this.cataloguedata[i])
    			for (let k = 0; k<this.cataloguedata[i].child.length;k++) {
    				this.level2.push(this.cataloguedata[i].child[k])		
    				for(let j =0; j<this.cataloguedata[i].child[k].child.length;j++){
    					this.level3.push(this.cataloguedata[i].child[k].child[j])
    				}
    			}
    		}
    	})
    	
    },
    computed: {
    ...mapGetters([
      'list'
    ])
  },
    components: {
    	tip: Tip,
    	filters: Filters,
    	tables: Tables,
    	panel: Panel,
    	confirm: Confirm
    },
    methods: {
	    create (name) {
	      this.show[name] = true;
	      // console.log(this.level1)
	    },
	    close (name) {
	    	this.show[name] = false;
	    },
	    edit () {
	    	this.panels=[
	    		  {name: 'CatalogueName', text: '名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null' },
	    		  {name: 'ParentClass', text: '父分类', type: 'select', sub: 'select'},
	    		  {name: 'KeyWords', text: '关键词', holder: '请输入关键词', type: 'input', sub: 'input',check: 'is_null'},
	    		  {name: 'No', text: '排序',holder: '请输入序号...', type: 'input', sub: 'input', check: 'is_null'},
	    		  {name: 'Standard', text: '规格绑定', type: 'select', sub: 'select'},
	    		  {name: 'Parameters', text: '参数绑定', type: 'select', sub: 'select'}
	    	]
	    	this.show['panel'] = true;
	    }
    }
  }
</script>

<style scoped lang="stylus">
  .slide-fade-enter-active
    transition: all .3s ease
    -webkit-transition: all .3s ease
  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-active
    transform: translateX(10px)
    -webkit-transform: translateX(10px)
    opacity: 0
</style>