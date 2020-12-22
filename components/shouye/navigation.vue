<template>
  <div>
    <div style="position: fixed;width: 100%;z-index: 999;">
      <el-container>
        <el-col :span="24">
          <el-menu active-text-color="red" text-color="black"
                   background-color="gainsboro" show-timeout="3000"
                   :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item><img src="img/pdlg01.jpg" style="width: 125px;"></el-menu-item>
            <el-menu-item disabled class="el-icon-success">欢迎光临胖达乐购:</el-menu-item>

              <el-submenu index="1"  v-if="user!=null">
                <template slot="title">
                  <el-avatar :size="size" :src="circleUrl"></el-avatar>
                  {{user}}
                </template>
                <el-menu-item index="1-1">个人中心</el-menu-item>
                <el-menu-item index="1-2" @click="tcdl">退出登录</el-menu-item>
              </el-submenu>

              <el-menu-item index="1"  v-if="user==null">
                未登录
              </el-menu-item>

            <el-menu-item index="6" style="margin-left: 225px">
              <el-input v-model="shang" placeholder="请输入要搜索的商品" @change="search" style="width: 500px"></el-input>
            </el-menu-item>
            <el-menu-item index="2" style="margin-left: 140px" v-if="user==null"><a href="#" @click="dkdl">【登录】</a></el-menu-item>
            <el-menu-item index="7"><a href="#" @click="dkzc">【注册】</a></el-menu-item>
            <el-menu-item index="3"><i class="el-icon-phone-outline"></i>拨打热线:13787499481</el-menu-item>
            <el-submenu index="4">
              <template slot="title">更多</template>
              <el-menu-item index="4-1" @click="shanghu">进入商户</el-menu-item>
              <el-menu-item index="4-2" @click="houduan">进入后端</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
              <i class="el-icon-shopping-cart-1"></i>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-container>
      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;">
      </div>


    </div>
    <div style="  position: fixed;width: 100%;top: 60px;z-index: 999;">
      <el-container>
        <el-col :span="24">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title" style="text-center:center">
                全部商品<i class="header-icon el-icon-info"></i>
              </template>
              <div align="left" style="padding-left:20px">
                <el-tabs type="border-card" :tab-position="tabs" style="height: 250px;">
                  <el-tab-pane label="精选肉类"><h4>精选肉类</h4></el-tab-pane>
                  <el-tab-pane label="绿色鲜蔬"><h4>绿色鲜蔬</h4></el-tab-pane>
                  <el-tab-pane label="粮油杂货"><h4>粮油杂货</h4></el-tab-pane>
                  <el-tab-pane label="食品饮料"><h4>食品饮料</h4></el-tab-pane>
                  <el-tab-pane label="新鲜水果"><h4>新鲜水果</h4></el-tab-pane>
                </el-tabs>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-container>
    </div>

    <div style="padding-top:90px">
      <el-container>
        <el-col :span="22" class="el-col-offset-1">
          <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="item in imagebox" :key="item.id">
              <img :src="item.idView" class="image">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-container>
    </div>

    <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
    <h1>水果区</h1>
    <el-row>
      <el-col :span="4" class="el-col-offset-1">
        <div><img src="imgs/7.jpg" class="log"></div>
      </el-col>
      <el-col :span="17" class="el-col-offset-1">
        <table>
          <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
            <td>
              <div>
                <a href="#">
                  <img :src=msg2[index].ims class="imgs"><br>
                  <label>{{ msg2[index].id | fmatter }}</label>
                </a>
              </div>
            </td>
            <td>
              <a href="#"><img :src=msg2[index+1].ims class="imgs"><br>
                <label>{{ msg2[index + 1].id }}</label>
              </a></td>
            <td><a href="#"><img :src=msg2[index+2].ims class="imgs"><br>
              <label>{{ msg2[index + 2].id }}</label>
            </a>
            </td>
            <td><a href="#"><img :src=msg2[index+3].ims class="imgs"><br>
              <label>{{ msg2[index + 3].id }}</label>
            </a>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>

    <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;"></div>
    <h1>蔬菜区</h1>
    <el-row>
      <el-col :span="4" class="el-col-offset-1">
        <div><img src="imgs/10.jpg" class="log"></div>
      </el-col>
      <el-col :span="17" class="el-col-offset-1">
        <table style="table-layout:fixed">
          <tr v-for="(chapter,index) in msg2" v-if="index%4==0">
            <td>
              <a href="#">
                <div><img :src=msg2[index].ims class="imgs"><br>
                  <label>{{ msg2[index].id }}</label><br>
                  <label>{{ msg2[index].price }}</label>
                </div>
              </a>
            </td>
            <td>
              <a href="#"><img :src=msg2[index+1].ims class="imgs"><br>
                <label>{{ msg2[index + 1].id }}</label><br>
                <label>{{ msg2[index + 1].price }}</label>
              </a></td>
            <td><a href="#"><img :src=msg2[index+2].ims class="imgs"><br>
              <label>{{ msg2[index + 2].id }}</label><br>
              <label>{{ msg2[index + 2].price }}</label>
            </a>
            </td>
            <td><a href="#"><img :src=msg2[index+3].ims class="imgs"><br>
              <label>{{ msg2[index + 3].id }}</label><br>
              <label>{{ msg2[index + 3].price }}</label>
            </a>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
    <img src="imgs/11.jpg" style="width: 100%">

    <el-dialog title="登录页面" :visible.sync="dlym" width="30%">
      <div>
        <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入账号" v-model="form.username" prefix-icon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
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

    <el-dialog title="注册页面" :visible.sync="zcym">
      <div>
        <el-form ref="registerForm" :model="registerForm" :rules="rules2" label-width="80px" class="register-box">
          <h3 class="register-title">用户注册</h3>
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
    name: "navigation",
    data() {
      return {
        dialogVisible: false,
        user: sessionStorage.getItem("username"),
        circleUrl:"./img/2.png",
        zcym:false,
        activeIndex: '1',
        shang: "",
        tabs: "left",
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
        imagebox: [
          {id: 0, idView: 'imgs/1.jpg'},
          {id: 1, idView: 'imgs/2.jpg'},
          {id: 2, idView: 'imgs/3.jpg'}
        ],
        msg2: [
          {id: 1, price: 13.5, ims: "imgs/1.jpg"},
          {id: 2, price: 13.5, ims: "imgs/2.jpg"},
          {id: 3, price: 13.5, ims: "imgs/3.jpg"},
          {id: 4, price: 13.5, ims: "imgs/3.jpg"},
          {id: 5, price: 13.5, ims: "imgs/3.jpg"},
          {id: 6, price: 13.5, ims: "imgs/3.jpg"},
          {id: 7, price: 13.5, ims: "imgs/3.jpg"},
          {id: 8, price: 13.5, ims: "imgs/3.jpg"}
        ]
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      search() {
        this.$router.push("/search")
      },
      houduan() {
        this.$router.push("/login");
      },
      shanghu() {
        this.$router.push("/shdl")
      },
      dkdl(){
        this.dlym=true
      },
      dkzc(){
        this.zcym=true;
      },
      tcdl(){
        sessionStorage.removeItem("username")
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
                  _this.dlym=false
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
    }
  }
</script>

<style scoped>
  /*
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  */

  .image {
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
  }

  .log {
    width: 260px;
    height: 544px
  }


  table tr td {
    background-color: lightgreen;
    align-content: center;
    width: 5%;
    height: 270px;
  }

  table tr td label {
    word-break: break-all;
    overflow: hidden;
  }

  .imgs {
    height: 200px;
    width: 210px;
  }

  .el-row {
    margin-top: 30px;
  }

  body {
    background-color: gainsboro;
  }
</style>
