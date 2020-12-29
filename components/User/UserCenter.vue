<template>
  <div class="center">
    <el-row>
      <el-col>
        <br>
        <el-divider content-position="center" style="color: indianred">个人中心</el-divider>
        <br>
      </el-col>
    </el-row>
    <el-tabs tab-position="left" style="height: 500px;width:100% ;font-size: 30px;margin-top: 30px">
      <el-tab-pane label="个人信息" style="font-size: 30px">
        <el-card class="box-card">
          <div slot="header">
            <span>个人信息</span>
            <el-button type="text" @click="openEditData">修改信息</el-button>
          </div>
          <div>
            <el-row>
              <label style="color: darkorange">昵称:</label>
              <span style="color: yellowgreen">{{ userVo.name }}</span>
            </el-row>
            <el-row>
              <label style="color: darkorange">用户名:</label>
              <span style="color: yellowgreen">{{ userVo.username }}</span>
            </el-row>
            <el-row>
              <label style="color: darkorange">性别:</label>
              <span style="color: yellowgreen">{{ userVo.sex }}</span>
            </el-row>
            <el-row>
              <label style="color: darkorange">手机号:</label>
              <span style="color: yellowgreen">{{ userVo.phone }}</span>
            </el-row>
            <el-row>
              <label style="color: darkorange">地址:</label>
              <span style="color: yellowgreen">{{ userVo.address }}</span>
            </el-row>
          </div>
        </el-card>

      </el-tab-pane>
      <el-tab-pane label="我的钱包">
        <el-row>
          <label style="color: darkorange">余额:</label>
          <span style="color: yellowgreen">{{ userVo.price }}</span>
        </el-row>
        <el-row>
          <el-button type="primary" @click="">充值余额</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="购物车">
        配置管理
      </el-tab-pane>
      <el-tab-pane label="我的订单">
        <el-table>

        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="修改用户" :visible.sync="editFormVisible" center
               :before-close="handleClose">
      <el-form label-width="auto">
        <!--        <el-form-item label="头像" prop="image">
                  <input type="file"/>
                </el-form-item>-->
        <el-form-item label="昵称" prop="name">
          <el-input v-model="userVo.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userVo.sex" label="男">男</el-radio>
          <el-radio v-model="userVo.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userVo.phone"></el-input>
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
  name: "UserCentre",
  data() {
    return {
      user: sessionStorage.getItem("yhname"),
      id: sessionStorage.getItem("id"),
      editFormVisible: false,
      userVo: {
        id: undefined,
        username: undefined,
        password: undefined,
        name: undefined,
        sex: undefined,
        phone: undefined,
        address: undefined,
        price: undefined
      },
    }
  },
  methods: {
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
      params.append("id", this.id);
      this.$axios.post("user/queryUserById.action", params)
        .then(result => {
          this.userVo = result.data;
        })
        .catch(error => {
          console.log(error)
        })
    },
    openEditData() {
      this.editFormVisible = true;

    },
    editData() {
      var _this=this
      let params = new URLSearchParams();
      params.append("id", this.userVo.id);
      params.append("name", this.userVo.name);
      params.append("sex", this.userVo.sex);
      params.append("phone", this.userVo.phone);
      params.append("address", this.userVo.address);
      this.$axios.post("user/updateUser.action", params)
        .then(result => {
          if (result.data.flag === true) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearEditForm();
            sessionStorage.setItem("yhname",_this.userVo.name);
            this.getData();
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearEditForm() {
      this.editFormVisible = false;
    }
  },
  created() {
    this.getDate();
  }
}
</script>

<style scoped>
</style>
