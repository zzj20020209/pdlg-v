<template>
  <el-card class="box-card">
    <el-container>
      <el-aside>
        <el-row>
          <el-col>
            <el-avatar @error="errorHandler"></el-avatar>
          </el-col>
        </el-row>
        <el-row justify="middle">
          <el-col>
            <span v-model="userInfoForm.name">{{}}</span>
          </el-col>
        </el-row>
      </el-aside>
      <el-divider class="divider-vertical" direction="vertical"></el-divider>
      <el-main>
        <el-row>
          <el-col>
            <el-divider content-position="center">个人信息</el-divider>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form :model="userInfoForm">
              <el-form-item label="昵称">
                <el-input v-model="userInfoForm.name"/>
              </el-form-item>
              <el-form-item label="性别">
                <el-radio v-model="userInfoForm.sex" label="男">男</el-radio>
                <el-radio v-model="userInfoForm.sex" label="女">女</el-radio>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-card>
  <!--  <div>
      <el-card class="box-card">
        <el-form :model="userInfoForm">
          <el-form-item label="头像上传">
            <input type="file" @change="getFile($event)"/>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userInfoForm.username"/>
          </el-form-item>
  &lt;!&ndash;        <el-form-item label="密码">
            <el-input v-model="userInfoForm.password" show-password/>
          </el-form-item>&ndash;&gt;
          <el-form-item label="昵称">
            <el-input v-model="userInfoForm.name"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="userInfoForm.sex" label="男">男</el-radio>
            <el-radio v-model="userInfoForm.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userInfoForm.phone"/>
          </el-form-item>
  &lt;!&ndash;        <el-form-item label="地址">
            <el-input v-model="userInfoForm.address"/>
          </el-form-item>
          <el-form-item label="余额">
            <el-input v-model="userInfoForm.price" disabled/>
          </el-form-item>&ndash;&gt;
        </el-form>
      </el-card>
    </div>-->
</template>

<script>
export default {
  name: "UserData",
  data() {
    return {
      userInfoForm: {
        image: '',
        username: '',
        password: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        price: ''
      },
      methods: {
        errorHandler() {
          return true;
        },
        binding () {
          let _this = this;
          let uid = sessionStorage.getItem("uid");
          let params = new URLSearchParams();
          params.append("uid",uid);
          this.$axios.post("user/queryUserById.action",params)
          .then(result => {

          })
        }
      }
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 800px;
  margin: 50px auto;
}
.divider-vertical{
  width: 1px;
  height: 500px;
}
</style>
