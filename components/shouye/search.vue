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

            <el-menu-item index="6" style="margin-left: 225px">
              <el-input v-model="shang" placeholder="请输入要搜索的商品" @change="search" style="width: 500px"></el-input>
            </el-menu-item>
            <el-menu-item index="2" style="margin-left: 140px" v-if="user==null" @click="dkdl">【登录】</el-menu-item>
            <el-menu-item index="7" @click="dkzc" v-if="user==null">【注册】</el-menu-item>
            <el-menu-item index="11" v-if="user!=null" style="margin-left: 275px"><i class="el-icon-phone-outline" ></i>拨打热线:13787499481</el-menu-item>
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
      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;">
      </div>
    </div>
    <el-row style="margin-left: 8px;padding-top: 60px">
      <el-col :span="6">
        <div align="left">
          <el-tabs type="border-card" :tab-position="tabs"
                   style="position:fixed;z-index:998;height: 500px;width: 470px">
            <el-tab-pane label="精选肉类"><h4>精选肉类</h4></el-tab-pane>
            <el-tab-pane label="绿色鲜蔬"><h4>绿色鲜蔬</h4></el-tab-pane>
            <el-tab-pane label="粮油杂货"><h4>粮油杂货</h4></el-tab-pane>
            <el-tab-pane label="食品饮料"><h4>食品饮料</h4></el-tab-pane>
            <el-tab-pane label="新鲜水果"><h4>新鲜水果</h4></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="18" class="el-col-offset-6">
        <div style="overflow:auto">
          <a href="#">
            <ul v-for="cu in msg2"
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled">
              <li v-for="i in count" class="list-item">
                <el-card :body-style="{ padding: '0px' }" style="background-color: greenyellow">
                  <img :src="cu.ims" class="imgs">
                  <div style="padding: 14px;">
                    <time class="time">名称:{{ cu.id }}</time>
                    <br>
                    <time class="time">价格:{{ cu.price }}/1个</time>
                  </div>
                </el-card>
              </li>
            </ul>
          </a>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-col>
    </el-row>
    <el-drawer
      title="我是标题"
      :visible.sync="tk"
      :with-header="false"
      size="40%">
      <span>购物车</span>
    </el-drawer>
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
  name: "search",
  data() {
    return {
      circleUrl:"./img/2.png",
      tk:false,
      dialogVisible: false,
      user: sessionStorage.getItem("yhname"),
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
      msg2: [
        {id: 1, price: 13.5, ims: "imgs/1.jpg"},
        {id: 2, price: 13.5, ims: "imgs/2.jpg"},
        {id: 3, price: 13.5, ims: "imgs/3.jpg"},
        {id: 4, price: 13.5, ims: "imgs/3.jpg"},
        {id: 5, price: 13.5, ims: "imgs/3.jpg"},
        {id: 6, price: 13.5, ims: "imgs/3.jpg"},
        {id: 7, price: 13.5, ims: "imgs/3.jpg"},
        {id: 8, price: 13.5, ims: "imgs/3.jpg"},
      ],
      count: 1,
      loading: false,
      tabs: "left",
      drawer: false,
      shang: ""
    }
  }, computed: {
    noMore() {
      return this.count >= 1;
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    sy(){
      this.$router.push("/")
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 1500)
    },
    pdrr(){
      this.tk=true
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    search() {
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
  }
}
</script>

<style scoped>
.imgs {
  height: 400px;
  width: 800px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
  *{
    text-align: center;
  }
</style>
