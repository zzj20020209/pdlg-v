<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="dage" style="height: 150px;width: 100%;">
          <h1>欢迎进入胖达乐购后台管理</h1>
          <br>
          欢迎：{{username}}
          <br>
          当前时间:{{dateFormat(date)}}
          <br>
          <br>
          <a href="#" @click="zx">注销</a>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-menu
          style="height: 750px;"
          text-color="black"
          background-color="whitesmoke"
          active-text-color="#ffd04b">
          <template v-for="menu in this.menuData">
            <el-submenu :key="menu.id" :index="menu.id+''">
              <template slot="title">
                <!-- <i :class="menu.icon"></i>-->
                <span slot="title">{{ menu.lable }}</span>
              </template>
              <el-menu-item-group>
                <div v-for="cmenu in menu.childMenu">
                  <el-menu-item @click="addTab(cmenu.lable,cmenu.linkUrl)" :key="cmenu.id" :index="cmenu.id+''">
                    <!--<i :class="cmenu.icon"></i>-->
                    <span slot="title">{{ cmenu.lable }}</span>
                  </el-menu-item>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="18" class="el-col-offset-1">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <component :is="item.content"></component>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import employee from "./employee";
import Goods from "../Goods/Goods";
import Sh from "../Shanghu/Sh";
import ShSp from "../Shanghu/ShSp";
import role from "./role";

import UserList from "../User/UserList";
export default {
  name: "backstage",
  data() {
    return {
      date: new Date(),
      menuChild: [],
      menuData: [],
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: 0,
      username:sessionStorage.getItem("username")
    }
  }
  ,
  components: {
    employee,
    Sh,
    Goods,
    ShSp,
    role,
    UserList
  },
  methods: {
    date(){
      return Date.now();
    },
    dateFormat(time) {
      let date=new Date(time);
      let year=date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
      * */
      let month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
      let day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
      let hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
      let minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
      let seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    },
    getDate() {
      let _this = this;
      this.$axios.post("/queryMenuAll.action").then(function (result) {
        _this.menuData = result.data;
      }).catch(function (erreo) {
        alert(erreo)
      })
    },
    addTab(titleName, comval) {
      var res = this.editableTabs.filter((item) => {
        return item.title == titleName
      });
      if (res.length == 0) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: titleName,
          name: newTabName,
          content: comval
        });
        this.editableTabsValue = newTabName;
      } else {
        this.editableTabsValue = res[0].name;
      }

    },
    zx(){
      sessionStorage.removeItem("username");
      this.$router.push("/")
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  created() {
    this.getDate();
  },
  mounted() {
    //显示当前日期时间
    let _this = this// 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>

<style scoped>
  #dage{
    text-align: center  ;
  }
</style>
