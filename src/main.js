import Vue from 'vue'
import App from './App.vue'
import Goods from "../components/Goods/Goods";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

Vue.use(ElementUI)


Axios.defaults.baseURL = "http://localhost:8080/pdlg"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios
new Vue({
  el: '#app',
  render: h => h(Goods)
})
