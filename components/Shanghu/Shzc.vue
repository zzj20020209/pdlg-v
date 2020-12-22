<template>
  <div>
    <h3 style="margin-right: 160px">商户注册</h3>

    <el-row>

      <el-col :span="8" :offset="8">
        <el-form label-width="80px" style="width: 400px">
          <el-form-item label="商户名">
            <el-input v-model="shm" placeholder="请输入商户名"></el-input>
          </el-form-item>

          <el-form-item label="商户账号">
            <el-input v-model="shzh" placeholder="请输入商户账号" disabled></el-input>
          </el-form-item>

          <el-form-item label="商户密码">
            <el-input v-model="mm" placeholder="请输入密码" disabled></el-input>
          </el-form-item>

          <el-form-item label="商户地址">
            <el-input v-model="address" placeholder="请输入地址"></el-input>
          </el-form-item>

          <el-form-item label="商户电话">
            <el-input v-model="stele" placeholder="请输入电话"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="zcsq()">申请</el-button>
            <el-button type="primary" @click="fhdl()">返回</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>


  </div>
</template>

<script>
    export default {
        name: "Shzc",
      data(){
          return{
            shm:"",
            shzh:sessionStorage.getItem("username"),
            mm:sessionStorage.getItem("password"),
            address:"",
            stele:""
          }
      },
      methods:{
          zcsq(){
              var _this = this;

              var params = new URLSearchParams();
              params.append("sname",this.shm);
              params.append("yhm", this.shzh);
              params.append("password", this.mm);
              params.append("address",this.address);
              params.append("stele",this.stele);

              this.$axios.post("shzc",params).then(function (result) {
                _this.$message({
                  message: result.data,
                  type: 'success'
                });
              }).catch(function (error) {
                alert(error);
                console.log(error)
              });
          },
        fhdl(){
          this.$router.push("/shdl");
        }
      }
    }
</script>

<style scoped>

</style>
