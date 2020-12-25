<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="name" placeholder="请输入关键字进行搜索"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="openAddUser" type="success">添加用户</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加用户" :visible.sync="addFormVisible" center
               :before-close="handleClose">
      <el-form label-width="auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addUserForm.sex" label="男">男</el-radio>
          <el-radio v-model="addUserForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addUserForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="clearAddForm">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editFormVisible" center
               :before-close="handleClose">
      <el-form label-width="auto">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="editUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editUserForm.sex" label="男">男</el-radio>
          <el-radio v-model="editUserForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editUserForm.address"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="address">
          <el-input v-model="editUserForm.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" size="mini" @click="clearEditForm">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="tableData"

      stripe>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码">
      </el-table-column>
      <el-table-column
        prop="name"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="price"
        label="余额">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="getEditUser(scope.row.id)">编辑</el-button>
          <el-popconfirm title="确定删除这条记录吗？" @confirm="delUserData(scope.row.id)">
            <el-button type="danger" size="mini" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="text-align: center;margin-top: 20px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   layout="total, prev, pager, next,sizes"
                   :total="total"
                   :page-size="5"
                   :page-sizes="[5,10,20]">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      addFormVisible: false,
      editFormVisible: false,
      id: '',
      username: '',
      password: '',
      name: '',
      sex: '',
      phone: '',
      address: '',
      price: '',
      total: 1,
      page: 1,
      rows: 5,
      addUserForm: {
        username: '',
        password: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
      },
      editUserForm: {
        id: '',
        username: '',
        password: '',
        name: '',
        sex: '',
        phone: '',
        address: '',
        price:'',
      },
    }
  },
  computed: {

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
    getData() {
      let params = new URLSearchParams();
      params.append("page", this.page);
      params.append("rows", this.rows);
      params.append("name", this.name);
      params.append("username", this.username);
      params.append("address", this.address);
      params.append("sex", this.sex);
      this.$axios.post("user/queryAllUser.action", params)
        .then(result => {
          this.tableData = result.data.rows;
          this.total = result.data.total;
        })
    },
    search() {
      this.getData();
    },
    addUser() {
      let params = new URLSearchParams();
      params.append("username", this.addUserForm.username);
      params.append("password", this.addUserForm.password);
      params.append("name", this.addUserForm.name);
      params.append("sex", this.addUserForm.sex);
      params.append("phone", this.addUserForm.phone);
      params.append("address", this.addUserForm.address);
      this.$axios.post("user/register.action", params)
        .then(result => {
          if (result.data.flag === true) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearAddForm();
            this.getData();
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    delUserData(val) {
      let params = new URLSearchParams();
      params.append("id", val);
      this.$axios.post("user/delUser.action", params)
        .then(result => {
          if (result.data.flag === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getData();
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    openAddUser() {
      this.addFormVisible = true;
    },
    clearAddForm() {
      this.addFormVisible = false;
    },
    getEditUser(val) {
      let params = new URLSearchParams();
      params.append("id", val);
      this.editFormVisible = true;
      this.$axios.post("user/queryUserById.action", params)
        .then(result => {
          this.editUserForm.id = result.data.id;
          this.editUserForm.username = result.data.username;
          this.editUserForm.password = result.data.password;
          this.editUserForm.name = result.data.name;
          this.editUserForm.sex = result.data.sex;
          this.editUserForm.phone = result.data.phone;
          this.editUserForm.address = result.data.address;
          this.editUserForm.price = result.data.price;
        })
        .catch(error => {
          console.log(error)
        })
    },
    clearEditForm() {
      this.editFormVisible = false;
    },
    editUser() {
      let params = new URLSearchParams();
      params.append("id", this.editUserForm.id);
      params.append("username", this.editUserForm.username);
      params.append("password", this.editUserForm.password);
      params.append("name", this.editUserForm.name);
      params.append("sex", this.editUserForm.sex);
      params.append("phone", this.editUserForm.phone);
      params.append("address", this.editUserForm.address);
      params.append("price", this.editUserForm.price);
      this.$axios.post("user/updateUser.action", params)
        .then(result => {
          if (result.data.flag === true) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearEditForm();
            this.getData();
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.page = val;
      this.getData();
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.rows = val;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
}
</script>

<style scoped>

</style>
