import DemoView1 from "../components/routerDemo/view/DemoView1";
import Vue from "vue";
import VueRouter from "vue-router";
import DemoView2 from "../components/routerDemo/view/DemoView2";
import View1Com from "../components/routerDemo/components/View1Com";
import View2Com from "../components/routerDemo/components/View2Com";
import Goods from "../components/Goods/Goods";
import Sh from "../components/Shanghu/Sh";
import Shgrzx from "../components/Shanghu/Shgrzx";
import Shzc from "../components/Shanghu/Shzc";
import Login from "../components/quan/login";
import backstage from "../components/quan/backstage";
import employee from "../components/quan/employee";
import Shdl from "../components/Shanghu/Shdl";

Vue.use(VueRouter)

const routes = [
  //启动项目！！！
  //path若是 "/"则表示是根路径（默认打开） 只能有一个 启动项目:http://localhost:9090/#/
  //path若不是"/"则启动项目:http://localhost:9090/#/path名

  /**
   * DemoView1页面路由地址
   */
  {
    path: "/demo1",
    component: DemoView1,
    //子路由
    children: [
      {
        path: "/demo1/v1",
        component: View1Com
      },
      {
        path: "/demo1/v2",
        component: View2Com
      }
    ]
  },
  /**
   * DemoView2页面路由地址
   */
  {
    path: "/demo2",
    component: DemoView2,
  },
  {
    path: "/goods",
    component: Goods,
  },
  {
    path:"/sh",
    component:Sh
  },
  {
    path:"/shgrzx",
    component:Shgrzx
  },
  {
    path: "/shzc",
    component: Shzc
  },
  {
    path:"/employee",
    component:employee
  },
  {
    path:"/backstages",
    component:backstage
  },
  {
    path:"/",
    component:Login
  }/*
  {
    path:"/",
    component:Shdl
  }*/
]
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes:routes
})
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router