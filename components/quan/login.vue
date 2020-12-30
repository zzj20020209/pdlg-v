<template>
  <div style="background-image: url('imgs/后端登录.jpg'); height: 937px;">
    <div>
      <el-row>
      <el-form ref="loginForm" :model="loginform" :rules="rules" label-width="80px" class="login-box">
        <h3 class="login-title" style="color: white">员工登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input type="text" placeholder="请输入账号" v-model="loginform.username" prefix-icon="el-icon-user-solid"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginform.password" prefix-icon="el-icon-lock"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round v-on:click="logins('loginForm')">登录</el-button>
          <el-button type="warning" round v-on:click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
      </el-row>
      <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>请输入正确的账号和密码</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginform: {
          username: "",
          password: ""
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },
        // 对话框显示和隐藏
        dialogVisible: false
      }
    }, methods: {
      logins(formName) {

        let _this = this;
        let pamer = new URLSearchParams();
        pamer.append("username", _this.loginform.username);
        pamer.append("password", _this.loginform.password);

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            //this.$router.push("/main");
            this.$axios.post('menuLogin.action', pamer)
              .then(result => {
                if (result.data.code == "0") {
                  //将登录成功的用户名存入store中
                  sessionStorage.setItem("username", result.data.username);
                  sessionStorage.setItem("id", result.data.id);
                  _this.$message({
                    message: "欢迎您:" + result.data.username,
                    type: 'success'
                  });
                  _this.$router.push("/backstages");
                } else {
                  this.dialogVisible = true;
                  return false;
                }
              })
              .catch(error => {
                alert(error)
              })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
