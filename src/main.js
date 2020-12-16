import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(ElementUI)


Axios.defaults.baseURL = "http://localhost:8080/pdlg"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

//路由配置
import Router from '../router/router.config'


//导入vuex定义的store文件
import Store from '../vuex/store.js'

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store:Store,//vuex挂载
})
