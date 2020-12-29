<template>
    <div style="font-size: 38px">
      <div slot="header">
        <span>个人信息</span>
        <el-button type="text" @click="xgsh">修改信息</el-button>

      </div>
      <div>
        <el-row>
          <label style="color: darkorange">昵称:</label>
          <span style="color: yellowgreen">{{ userVo.sname }}</span>
        </el-row>
        <el-row>
          <label style="color: darkorange">用户名:</label>
          <span style="color: yellowgreen">{{ userVo.yhm }}</span>
        </el-row>
        <el-row>
          <label style="color: darkorange">密码:</label>
          <span style="color: yellowgreen">{{ userVo.password }}</span>
        </el-row>
        <el-row>
          <label style="color: darkorange">手机号:</label>
          <span style="color: yellowgreen">{{ userVo.stele }}</span>
        </el-row>
        <el-row>
          <label style="color: darkorange">地址:</label>
          <span style="color: yellowgreen">{{ userVo.address }}</span>
        </el-row>
      </div>

      <el-dialog title="修改商户" :visible.sync="xg" center
                 :before-close="handleClose">
        <el-form label-width="auto">
          <!--        <el-form-item label="头像" prop="image">
                    <input type="file"/>
                  </el-form-item>-->
          <el-form-item label="昵称" prop="sname">
            <el-input v-model="userVo.sname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userVo.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="stele">
            <el-input v-model="userVo.stele"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="userVo.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="clearEditForm">取消</el-button>
        <el-button type="primary" @click="editData">确定</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "shxx",
      data() {
        return {
          id: sessionStorage.getItem("sid"),
          xg: false,
          yhm:sessionStorage.getItem("y"),
          userVo: {
            id: undefined,
            yhm: undefined,
            password: undefined,
            sname: undefined,
            sex: undefined,
            stele: undefined,
            address: undefined,
            price: undefined
          },
        }
      },
      methods: {
        xgsh(){
          this.xg = true;
        },
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        },
        getDate() {
          let params = new URLSearchParams();
          params.append("sid", this.id);
          this.$axios.post("/shcxdg", params)
            .then(result => {
              this.userVo = result.data;
            })
            .catch(error => {
              console.log(error)
            })
        },
        editData() {
          let params = new URLSearchParams();
          params.append("sid", this.userVo.sid);
          params.append("yhm", this.yhm);
          params.append("sname", this.userVo.sname);
          params.append("password", this.userVo.password);
          params.append("stele", this.userVo.stele);
          params.append("address", this.userVo.address);
          this.$axios.post("/shxg", params)
            .then(result => {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.clearEditForm();
                this.getData();
            })
            .catch(error => {
              console.log(error)
            })
        },
        clearEditForm() {
          this.xg = false;
        }
      },
      created() {
        this.getDate();
      }
    }
</script>

<style scoped>

</style>
