<template>
  <div class="wrap">
    <tip :parent="nav.parent"
         :child="nav.child"></tip>
    <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建参数</button>
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
  import Tables from '../../components/Tables.vue'
  import Tip from '../../components/Tip.vue'
  import Filters from '../../components/Filters.vue'
  import Panel from '../../components/Panel.vue'
  import Confirm from '../../components/Modal/Confirm.vue'
  import api from '../../api/api.js'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'goods',
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
          parent: '商品管理',
          child: '参数管理'
        },
        title: '',
        method: {
          list: 'role_list'
        },
        column: [
          {text: '序号', name: 'Disp_index'},
          {text: '参数名称', name: 'No'},
          {text: '参数组', name: 'Name'}
        ],
        options: [
          {name: '编辑', method: this.edit}
        ],
        panels: [
          {name: 'No', text: '参数名称', holder: '请输入名称...', type: 'input', sub: 'input', check: 'is_null'},
//          {name: 'Name', text: '参数分组', holder: '请输入名称...', type: 'multi', sub: 'multi', list: [{title: '新增参数组', id: 1}, {title: '选择参数组', id: 2}]},
          {name: 'Type', size: 'small', type: 'select', text: '参数分组', text1: ' ', list: [{Name: '新增参数组', Id: 'menu'}, {Name: '选择参数组', Id: 'auth'}]}
//          {name: 'Status', text: '是否激活', type: 'radio', sub: 'radio', radioval: [{text: '是', val: 1}, {text: '否', val: 0}]},

          // {name: 'UserId', text: '描述', holder: '请输部门成员或手机号', type: 'searcher', sub: 'searcher', get: {url: 'user_list'}, param: {PageNo: 1, Search: ''}},
//          {name: 'FuncIdList', text: '', holder: '', type: 'manage', sub: 'manage'}
          // {name: 'role', text: '用户角色', type: 'multi', sub: 'multi', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]},
          // {name: 'part', text: '选择部门', type: 'multi', sub: 'multi', list: [{title: '技术', id: 1}, {title: '产品', id: 2}, {title: '运营', id: 3}, {title: '产品', id: 4}, {title: '数据', id: 5}]}
        ],
        types: [],
        filters: [
          {name: 'Search', size: 'big', type: 'input', val: ''},
          {name: 'Type', size: 'small', type: 'select', val: '', text: '参数名称', list: [{title: '家用电器', id: ''}, {title: '床上那点事', id: '1'}, {title: '珠宝配饰', id: '2'}]},
          // {name: 'active', size: 'small', type: 'select', text: '是否激活', list: [{title: '是', id: 1}, {title: '否', id: 2}]},
          // {name: 'role', size: 'small', type: 'multi', text: '选择角色', list: [{title: '超管员', id: 1}, {title: '财务', id: 2}, {title: '运营', id: 3}]}
          {name: 'Type', size: 'small', type: 'select', val: '', text: '参数组', list: [{title: '电子', id: ''}, {title: '床上用品', id: '1'}, {title: '珠宝配饰', id: '2'}]}
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
        'list', 'slide'
      ])
    },
    methods: {
      ...mapActions(['resetsingle', 'getdata', 'setslide']),
      close (data) {
        this.show[data.name] = false
      },
      create (name) {
        this.types = [
          {name: 'quit', text: '取消', url: ''},
          {name: 'save', text: '保存', url: 'parameters_insert'}
        ]
        this.resetsingle()
        for (let i in this.show) {
          if (i === name) {
            this.show[i] = !this.show[i]
          } else {
            this.show[i] = false
          }
        }
        this.title = '创建参数'
      },
      del (idx, id) {
        let updata = []
        updata.push(id)
        this.$refs.dialog.confirm().then(() => {
//          api.post({JSON: JSON.stringify(updata)}, 'role_delete').then((item) => {
//            this.getdata()
          api.mockDel({JSON: JSON.stringify(updata)}, 'parameters').then((item) => {
            this.getdata()
          })
        })
      },
      edit (idx) {
//        console.log()
        this.types = [
          {name: 'quit', text: '取消', url: ''},
          {name: 'save', text: '保存', url: 'parameters_update'}
        ]
        this.show.panel = !this.show.panel
        this.title = '编辑参数'
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
