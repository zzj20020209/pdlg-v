<template>
  <div style="position: fixed;width: 100%;z-index: 999;">
      <el-col :span="24">
        <el-menu active-text-color="red" text-color="black"
                 background-color="gainsboro" show-timeout="3000"
                 :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="10" @click="sy"><img src="img/pdlg01.jpg" style="width: 125px;"></el-menu-item>
          <el-menu-item disabled class="el-icon-success">欢迎光临胖达乐购:</el-menu-item>

          <el-submenu index="1"  v-if="user!=null">
            <template slot="title">
              <el-avatar :size="size" :src="circleUrl"></el-avatar>
              {{user}}
            </template>
            <el-badge is-dot style="width: 200px">
              <el-menu-item index="1-1" @click="grzx">个人中心</el-menu-item>
            </el-badge>
            <el-menu-item index="1-2" @click="tcdl">退出登录</el-menu-item>
          </el-submenu>

          <el-menu-item index="1"  v-if="user==null">
            未登录
          </el-menu-item>

          <el-menu-item index="6" style="margin-left: 225px">
            <el-input v-model="shang" placeholder="请输入要搜索的商品" @change="search" style="width: 500px"></el-input>
          </el-menu-item>
          <el-menu-item index="2" style="margin-left: 140px" v-if="user==null" @click="dkdl">【登录】</el-menu-item>
          <el-menu-item index="7" @click="dkzc" v-if="user==null">【注册】</el-menu-item>
          <el-menu-item index="11" v-if="user!=null" style="margin-left: 275px"><i class="el-icon-phone-outline" ></i>拨打热线:13787499481</el-menu-item>
          <el-menu-item index="3" v-if="user==null"><i class="el-icon-phone-outline"></i>拨打热线:13787499481</el-menu-item>
          <el-submenu index="4">
            <template slot="title">更多</template>
            <el-menu-item index="4-1" @click="shanghu">进入商户</el-menu-item>
          </el-submenu>
          <el-menu-item index="5" @click="pdrrr()">
            <i class="el-icon-shopping-cart-1"></i>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="24" style="width: 100%;height: 100%" >
<div style="height: 400px;border: 1px solid darkgrey">
          <el-row>
            <div style="text-align: center;margin-top: 120px;">
            <img src="img/支付成功%20(1).png">
            <h1>支付成功</h1><br><el-button @click="shouye">返回首页</el-button>
            </div>
          </el-row>

</div>
      </el-col>


  </div>
</template>

<script>
    export default {
        name: "success",
      data(){
          return{
            user: sessionStorage.getItem("yhname"),
            circleUrl:"./img/2.png",
          }
      },
      methods:{
        shouye(){
          this.$router.push("/navigation/shouyemian")
        }
      }
    }
</script>

<style scoped>

</style>
