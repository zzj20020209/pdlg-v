<template>
  <div>

    <h3>商户登录</h3>
    <el-row>

      <el-col :span="8" :offset="8">
        <el-form label-width="80px" style="width: 400px">
          <el-form-item label="商户账号">
            <el-input v-model="shyhm" placeholder="请输入商户账号"></el-input>
          </el-form-item>

          <el-form-item label="商户密码">
            <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button>取消</el-button>
            <el-button type="primary" @click="zc">注册</el-button>
          </el-form-item>


        </el-form>
      </el-col>
    </el-row>


  </div>
</template>

<script>
    export default {
        name: "Shdl",
      data() {
        return {

          shyhm: 'rr',
          password: "rr"

        }
      },
      methods: {
        onSubmit() {
          var _this = this;

          var params = new URLSearchParams();
          params.append("yhm", this.shyhm);
          params.append("password", this.password);

          this.$axios.post("shdl",params).then(function (result) {
            if (result.data.code == "0") {
              //登录成功  跳转 首页
              alert(result.data.msg);
              //将登录成功的用户名存入store中
              sessionStorage.setItem("sname",result.data.yhm)

              _this.$router.push("/shgrzx");


            } else {
              //弹出消息  停留在该页面
              alert(result.data.msg);
            }
          }).catch(function (error) {
            alert(error);
            console.log(error)
          });
        },
        zc(){
          this.$router.push("/shzc");
        }
      }
    }
</script>

<style scoped>

</style>
