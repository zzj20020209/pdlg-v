<template>
  <div>
    <h3>员工登录</h3>
  <el-form ref="loginform" :model="loginform" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="loginform.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginform.password" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="logins">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginform:{
        username: "",
        password: ""
      }
    }
  },methods:{
    logins(){

      let _this = this;
      let pamer = new URLSearchParams();
      pamer.append("username",_this.loginform.username);
      pamer.append("password",_this.loginform.password);
      this.$axios.post("/menuLogin.action",pamer).
      then(function (result) {
        if (result.data.code == "0") {
          //将登录成功的用户名存入store中
          sessionStorage.setItem("username",result.data.username)
          sessionStorage.setItem("id",result.data.id)

          _this.$message({
            message: "欢迎您:"+result.data.username,
            type: 'success'
          });
          _this.$router.push("/backstages");


        } else {
          //弹出消息  停留在该页面
          alert(result.data.msg);
        }
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<style scoped>

</style>
