import Vue from 'vue'
import Goods from "../components/Goods/Goods";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios';
import router from "../router";
import App from "./App";

Vue.use(ElementUI)

Axios.defaults.baseURL = "http://localhost:8080/"
// 将baseURL绑定到全局
Vue.prototype.$axios = Axios
Vue.prototype.$host = "http://localhost:8080/";
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
