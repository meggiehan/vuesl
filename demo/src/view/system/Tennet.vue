<template>
<div class="wrap">
  <tip :parent="nav.parent"
       :child="nav.child"></tip>
  <div class="role main">
      <filters :filters="filters"
               :method="method"></filters>
      <div class="option">
        <button class="btn" @click="create('panel')">创建租户</button>
      </div>
      <tables :method="method"
              :column="column"
              :options="options"
              :filter="filters"></tables>
  </div>
  <transition name="slide-fade">
    <panel :panels="panels" :types="types" :styles="style" @close="close" v-if="show.panel">
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
  name: 'tennet',
  data () {
    return {
      confirms: {
        title: '提示',
        body: '确定删除?'
      },
      style: 'large',
      show: {
        panel: false,
        auth: false
      },
      nav: {
        parent: '系统管理',
        child: '租户管理'
      },
      title: '',
      method: {
        list: 'role_list'
      },
      column: [
        {text: '序号', name: 'DispIndex'},
        {text: '编号', name: 'No'},
        {text: '名称', name: 'Name'},
        {text: '最后操作时间', name: 'Create_time'}
      ],
      options: [
        {name: '编辑', method: this.edit},
        {name: '删除', method: this.del}
      ],
      panels: [
        {name: 'No', text: '编号', holder: '请输入编号*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'SubDomain', text: '子域名', holder: '请输入子域名*...', type: 'input', sub: 'input'},
        {name: 'Name', text: '名称', holder: '请输入名称*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'BizType', text: 'Biz类型', holder: '请输人Biz类型*...', type: 'input', sub: 'input'},
        {name: 'address', type: 'location', holder: '请输入地址*...' , check:'is_null', col: 'full'},
        {name: 'TradeNo', text: '商业模式', holder: '请输入商业模式*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'FaxPhone', text: '传真号', holder: '请输入传真号*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'ContactName', text: '联系人', holder: '请输入联系人名*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'PostCode', text: '邮编', holder: '请输入邮编*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'ContactPhoneNo', text: '电话', holder: '请输入联系人电话*...', type: 'input', sub: 'input', check: 'is_mobile'},
        {name: 'ContactEmail', text: '邮件', holder: '请输入邮件*...', type: 'input', sub: 'input', check: 'is_email'},
        {name: 'Phone', text: '联系电话', holder: '请输入联系电话*...', type: 'input', sub: 'input', check: 'is_mobile'},
        {name: 'JobLv', text: '工作职位', holder: '请输入工作职位*...', type: 'input', sub: 'input'},
        {name: 'Scale', text: '公司规模', holder: '请输入公司规模*...', type: 'input', sub: 'input', check: 'is_null'},
        {name: 'Description', text: '描述', holder: '请输入描述内容*...', type: 'textarea', sub: 'textarea'}


      ],
      types: [],
      filters: [
        {name: 'Search', size: 'big', type: 'input', val: ''}
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
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'role_insert'}
      ]
      this.resetsingle()
      for (let i in this.show) {
        if (i === name) {
          this.show[i] = !this.show[i]
        } else {
          this.show[i] = false
        }
      }
      this.setslide({name: name, value: !this.slide[name]})
      this.title = '创建角色'
    },
    del (idx, id) {
      let updata = []
      updata.push(id)
      this.$refs.dialog.confirm().then(() => {
        // api.post({JSON: JSON.stringify(updata)}, 'role_delete').then((item) => {
        //   this.getdata()
        // })
        api.mockDel({JSON: JSON.stringify(updata)}, 'tennet').then((item) => {
          this.getdata()
        })
      })
    },
    edit (idx) {
      this.types = [
        {name: 'quit', text: '退出', url: ''},
        {name: 'save', text: '保存', url: 'role_update'}
      ]
      this.show.panel = !this.show.panel
      this.title = '编辑角色'
    },
    auth (idx) {
      this.create('auth')
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
