<template>
  <div>
  <el-container style="height:100%;" direction="vertical">
    <el-container>
      <el-aside class="el-aside">
        <el-header class="el-header" style="height: 200px;margin-top: 110px">
          <div style="background-color: cornsilk;height: 220px;width: 200px">
            <br>
            <span>欢迎进入：[{{shm}}]！</span>
            <br>
            <el-avatar  id="tupian" :size="100" :src="circleUrl"></el-avatar>
            <br>
            <br>
            <a href="#" @click="tc">退出</a>
          </div>

        </el-header>
        <el-main class="el-main">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" style="background-color: darkgray">
          <el-menu-item index="2">
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

      <el-main class="el-main" style="margin-top: 110px">
          <h1>这里是商户页面</h1>
      </el-main>
    </el-container>

  </el-container>
  </div>
</template>

<script>
    export default {
      name: "Shgrzx",
      data(){
        return {
          shm: sessionStorage.getItem('sname'),
          activeIndex: '1',
          activeIndex2: '1',
          isCollapse: false,
          icon:"el-icon-s-fold",
          circleUrl:"./img/1.jpg"
        }
      },
      methods: {
        tc(){
          this.$router.push("/navigation/shouyemian")
          sessionStorage.removeItem("sname")
        }
      }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 640px;
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
