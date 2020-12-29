<template>
  <div class="homeWrap">
  <el-container style="height:100%" direction="vertical">
    <el-header class="el-header">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </el-header>


    <el-container>
      <el-aside class="el-aside">
        <el-header class="el-header" style="height: 200px">
          <div style="background-color: cornsilk;height: 220px;width: 200px">
            <br>
            <span>欢迎[{{shm}}]登录了！</span>
            <br>
            <el-avatar  id="tupian" :size="100" :src="circleUrl"></el-avatar>
            <br>
            <br>
            <a href="#" @click="tc">退出</a>
          </div>

        </el-header>
        <el-main class="el-main">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" style="background-color: darkgray">
          <el-menu-item index="2" @click="ding">
            <i class="el-icon-menu"></i>
            <span slot="title">我的订单</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">我的收入</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">信息/隐私</span>
          </el-menu-item>
        </el-menu>
        </el-main>
      </el-aside>

      <el-main class="el-main">
          <shangorder v-if="this.dingdan==true"></shangorder>
      </el-main>
    </el-container>

  </el-container>
  </div>
</template>

<script>
    import Shangorder from "../order/shangorder";
    export default {
      name: "Shgrzx",
      components: {Shangorder},
      data(){
        return {
          shm: sessionStorage.getItem('sname'),
          activeIndex: '1',
          activeIndex2: '1',
          isCollapse: false,
          icon:"el-icon-s-fold",
          circleUrl:"./img/1.jpg",
          dingdan:false,
        }
      },
      methods: {
        kai(){
           if(this.isCollapse==false){

           }
        },
        tc(){
          this.$router.push("/navigation/shouyemian")
          sessionStorage.removeItem("sname")
        },
        ding(){
          this.dingdan=true;
        }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 640px;
  }
  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
*{
  padding: 0px;
  margin: 0px;
  text-align: center;
}
  .el-menu-item{
    padding: 0 50px;
  }
</style>
