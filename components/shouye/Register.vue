<template>
  <div>
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="80px" class="register-box">
      <h3 class="register-title">注册</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="registerForm.username" prefix-icon="el-icon-user-solid"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" prefix-icon="el-icon-lock"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round v-on:click="onSubmit('registerForm')">确定</el-button>
        <el-button type="warning" round v-on:click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      registerForm: {
        username: '',
        password: ''
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
  },
  methods: {
    onSubmit(formName) {
      let _this = this;
      let params = new URLSearchParams();
      params.append("username", this.registerForm.username);
      params.append("password", this.registerForm.password);
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          //this.$router.push("/main");
          this.$axios.post('user/register.action',params)
            .then(result => {
              if (result.data.flag===true){
                _this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                _this.$router.push("/user/userInfo");
              } else {
                //this.dialogVisible = true;
                return false;
              }
            })
            .catch(error => {
              alert(error)
            })
        }
      });
    }
  }
}
</script>

<style scoped>
.register-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.register-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}


</style>
