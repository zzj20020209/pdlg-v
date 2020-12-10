import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(ElementUI)


Axios.defaults.baseURL = "http://127.0.0.1:8080/crmsystem"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios
new Vue({
  el: '#app',
  render: h => h(App)
})
