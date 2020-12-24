<template>
  <div>

    <div style="position: fixed;width: 100%;z-index: 999;">
      <el-container>
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
                <el-menu-item index="1-1">个人中心</el-menu-item>
              </el-badge>
              <el-menu-item index="1-2" @click="tcdl">退出登录</el-menu-item>
            </el-submenu>

            <el-menu-item index="1"  v-if="user==null">
              未登录
            </el-menu-item>
            <el-menu-item index="2" style="margin-left: 900px" v-if="user==null" @click="dkdl">【登录】</el-menu-item>
            <el-menu-item index="7" @click="dkzc" v-if="user==null">【注册】</el-menu-item>
            <el-menu-item index="11" v-if="user!=null" style="margin-left: 1060px"><i class="el-icon-phone-outline" ></i>拨打热线:13787499481</el-menu-item>
            <el-menu-item index="3" v-if="user==null"><i class="el-icon-phone-outline"></i>拨打热线:13787499481</el-menu-item>
            <el-submenu index="4">
              <template slot="title">更多</template>
              <el-menu-item index="4-1" @click="shanghu">进入商户</el-menu-item>
            </el-submenu>
            <el-menu-item index="5" @click="pdrr">
              <i class="el-icon-shopping-cart-1"></i>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-container>
    </div>

    <div style="padding-top: 60px;" class="el-col-offset-2">
    </div>
    <div style="padding-top: 5px;">
      <div style="width:100%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
      <el-row style="padding-top: 5px">
        <el-card style="background-color: whitesmoke" body-style="border-radius: 15px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);height:500px">
          <el-row>
            <el-col :span="10" class="el-col-offset-1">
              <div class="block">
                <el-carousel height="475px">
                  <el-carousel-item v-for="item in tableData.goodsImagelist" :key="item">
                    <img width="100%" height="100%" :src="$host + item.giurl" alt="">
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
            <el-col :span="12" class="el-col-offset-1">
              <div align="left">
                <span style="font-size: 20px;font-weight: bold;">{{tableData.gname}}</span>
                <br>
                <br>
                <div style="background-color: white;margin-top: 30px;border-radius:8px;width: 90%;height: 75px">
                  <span style="padding-left: 10px">价格:</span><span style="font-size: 30px;font-weight: bold;color: red;padding-left: 30px">￥{{tableData.gprice}}</span>
                  <div style="width:60%;height:1px;padding:0px;background-color:gray;overflow:hidden;"></div>
                  <span class="zi" style="padding-left: 10px;padding-top: 20px">更多商品优惠，尽在胖达乐购APP</span>
                </div>
                <div>
                  <el-row  style="padding-top: 25px">
                    <el-col :span="2">规格:</el-col>
                    <el-col :span="3"><table id="tab"><tr>{{tableData.gunit}}</tr></table></el-col>
                  </el-row>

                  <el-row style="padding-top: 25px">
                    <el-col :span="2">数量:</el-col>
                    <el-col :span="4"><el-input-number style="width: 100px;text-align: left" v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number></el-col>
                  </el-row>
                  <el-col style="padding-top: 25px" :span="24"><el-button type="danger" style="width: 600px;height: 60px" class="el-button"  icon="el-icon-shopping-cart-2">购买</el-button></el-col>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
    </div>
    <el-dialog id="yhdl" title="登录页面" :visible.sync="dlym" width="30%">
      <div >
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="form.username" prefix-icon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" placeholder="请输入密码" v-model="form.password" prefix-icon="el-icon-lock"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round v-on:click="onSubmit('loginForm')">登录</el-button>
            <el-button type="warning" round v-on:click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>

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
    </el-dialog>

    <el-dialog id="yhzc" title="注册页面" :visible.sync="zcym" width="30%">
      <div >
        <el-form ref="registerForm" :model="registerForm" :rules="rules2" label-width="80px" class="register-box">
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="registerForm.username" prefix-icon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" prefix-icon="el-icon-lock"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round v-on:click="zconSubmit('registerForm')">确定</el-button>
            <el-button type="warning" round v-on:click="zcresetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "particulars",
  data() {
    return {
      selectIndex:0,
      selectData:{},
      tableData: [],
      gname:"",
      gid:5,
      currentDate: new Date(),
      num: 1,
      tk:false,
      dialogVisible: false,
      user: sessionStorage.getItem("yhname"),
      circleUrl:"./img/2.png",
      zcym:false,
      dlym:false,
      form:{
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules2: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
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
    };
  },methods: {
    getData() { //获取数据方法
      this.tableData=[];
      var _this = this;
      var params = new URLSearchParams();
      params.append("gid", this.gid);
      this.$axios.post("/queryGoodsBygid.action",params).
      then(function(result) {
        _this.tableData = result.data;
      }).
      catch(function(error) {

      });

    },

    handleChange(value) {
      console.log(value);
    },
    sy(){
     this.$router.push("/")
    },
    pdrr(){
      this.tk=true
    },search() {
      this.$router.push("/search")
    },
    shanghu() {
      this.$router.push("/shdl")
    },
    dkdl(){
      this.dlym=true;
    },
    dkzc(){
      this.zcym=true;
    },
    tcdl(){
      sessionStorage.removeItem("username")
      sessionStorage.removeItem("password")
      sessionStorage.removeItem("yhname")
      this.user=null
      this.$router.push("/")
    },
    zconSubmit(formName) {
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
              if (result.data.flag==true){
                _this.$message({
                  message: '注册成功',
                  type: 'success',
                })
                _this.zcym=false
                this.$refs.registerForm.resetFields();
                _this.$router.push("/")
              } else {
                //this.dialogVisible = true;
                _this.$message({
                  message: '该用户已存在',
                  type: 'warning',
                })
              }
            })
            .catch(error => {
              alert(error)
            })
        }
      });
    },
    onSubmit(formName) {
      let _this = this;
      let params = new URLSearchParams();
      params.append("username", this.form.username);
      params.append("password", this.form.password);
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          //this.$router.push("/main");
          this.$axios.post('user/login.action',params)
            .then(result => {
              if (result.data.code==="0"){
                //将登录成功的用户名存入store中
                _this.$message({
                  message: result.data.mag,
                  type: 'success',
                })

                sessionStorage.setItem("username",result.data.username);
                sessionStorage.setItem("password",result.data.mm);
                sessionStorage.setItem("yhname",result.data.yhname);
                _this.user=result.data.yhname
                _this.dlym=false
                this.$refs.loginForm.resetFields();
                _this.$router.push("/")
              } else {
                this.dialogVisible = true;
                return false;
              }
            })
            .catch(error => {
              alert(result.data.mag);
            })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() { //钩子函数  vue对象初始化完成后  执行
    this.gid=sessionStorage.getItem("gid")
    this.getData();
  }
}
</script>

<style scoped>

.image {
  width: 80px;
  height: 70px;
  display: block;
  padding-left: 25px;
}

.zi{
  padding-top: 5px;
  color: gray;
}

#tab tr td{
  border: 1px red solid;
  padding: 0px;
}
.el-image{
  width: 560px;
  height: 400px;
}
</style>
