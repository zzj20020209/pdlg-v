import Vue from 'vue'
import App from "./App";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
//路由配置
import Router from '../router/index'
//导入vuex定义的store文件
import Store from '../vuex/store.js'
Vue.config.productionTip = false


Vue.use(ElementUI)


Axios.defaults.baseURL = "http://localhost:8080/"
Vue.prototype.$host = "http://localhost:8080/";
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App),
  router: Router,
  store: Store//vuex挂载
})
