<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建分类</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"
              :filter="filters"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" :types="types" @close="close" v-if="show.panel">
      <span slot="title">{{title}}</span>
    </panel>
  </transition>
   <confirm ref="dialog" :msg="confirms"></confirm>
</div>

</template>

<script>
		/* eslint-disable */
import Tables from '../../components/Tables.vue'
import Tip from '../../components/Tip.vue'
import Filters from '../../components/Filters.vue'
import Panel from '../../components/Panel.vue'
import api from '../../api/api.js'
import Confirm from '../../components/Modal/Confirm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'category',
  data () {
    return {
    	confirms: {
        title: '提示',
        body: '确定删除?'
      },
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '分类管理'
      },
      title: '',
      method: {
        list: 'category_list'
      },
      column: [
        {text: '序号', name: 'Disp_index'},
        {text: '编号', name: 'No'},
        {text: '名称', name: 'Name'},
        {text: '最后操作时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '删除', method: this.del}
      ],
      panels: [
        {name: 'No', text: '编号', holder: '请输入人编号...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Name', text: '名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null'},
        {
          name: 'DomainFor',
          size: 'small',
          type: 'select',
          text: '类型',
          text1: '请选择类型',
          list: [{Name: '单据数据类型', Id: 'BillType111'}, {Name: '会员等级', Id: '2'}, {Name: '区域城市', Id: '3'}, {Name: '账户类型', Id: '4'}, {Name: '商品分类', Id: '5'}, {Name: '商品品牌', Id: '6'}
          , {Name: '配送方式', Id: '7'}, {Name: '优惠券分类', Id: '8'}, {Name: '促销分类', Id: '9'}, {Name: '广告类型', Id: '10'}, {Name: '广告来源', Id: '11'}, {Name: '礼包分类', Id: '12'},
          {Name: '支付方式', Id: '13'}, {Name: '存储方式', Id: '14'}]
        },
        {name: 'ValueIs', text: '描述', holder: '请输入描述内容...', type: 'textarea', sub: 'textarea'}
        // {name: 'role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
        // {name: 'part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
      ],
      types: [],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''},
//      {name: 'Type', size: 'small', type: 'select', val: '', text: '类型', list: [{title: '单据类型', id: ''}, {title: '会员等级', id: '1'}, {title: '区域城市', id: '3'},{title: '账户类型', id: '4'},
//      {title: '商品分类', id: '5'},{title: '商品品牌', id: '6'},{title: '配送方式', id: '7'},{title: '优惠卷分类', id: '8'},{title: '促销分类', id: '9'},{title: '广告类型', id: '10'},{title: '广告来源', id: '11'},
//      {title: '礼包分类', id: '12'},{title: '支付方式', id: '13'},{title: '储存方式', id: '14'}]}
        // {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
      ]
    }
  },
  components: {
    tables: Tables,
    tip: Tip,
    filters: Filters,
    panel: Panel,
    confirm: Confirm
  },
  computed: {
    ...mapGetters([
      'list'
    ])
  },
  methods: {
    ...mapActions(['resetsingle', 'getdata']),
    close (data) {
      this.show[data.name] = false
    },
    create (name) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'category_insert'}
      ]
      this.resetsingle()
      for (let i in this.show) {
        if (i === name) {
          this.show[i] = !this.show[i]
        } else {
          this.show[i] = false
        }
      }
      this.title = '创建分类'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      this.$refs.dialog.confirm().then(() => {
      api.post({JSON: JSON.stringify(updata)}, 'category_delete').then((item) => {
        console.log('item', item)
        this.getdata()
      })
//		 api.mockDel({JSON: JSON.stringify(updata)}, 'category').then((item) => {
//        this.getdata()
//      })
		 })
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'category_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑分类'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="stylus">
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
