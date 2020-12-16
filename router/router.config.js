import Vue from 'vue'
import VueRouter from "vue-router";

import Shzc from "../components/Shanghu/Shzc";
import Sh from "../components/Shanghu/Sh";
import Shgrzx from "../components/Shanghu/Shgrzx";
import Shdl from "../components/Shanghu/Shdl";

Vue.use(VueRouter)

export  default  new VueRouter({
  routes:[
    {path:"/sh",component:Sh},
    {path:"/shgrzx",component:Shgrzx},
    {path: "/shzc",component: Shzc},
    {path:"/",component:Shdl},  //默认访问登录页面
  ]
})
