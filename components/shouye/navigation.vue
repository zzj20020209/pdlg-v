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
                  <el-menu-item index="1-1" @click="grzx">个人中心</el-menu-item>
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
            <el-menu-item index="5" @click="pdrrr()">
              <i class="el-icon-shopping-cart-1"></i>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-container>
      <div style="width:94%;height:2px;margin:0px auto;padding:0px;background-color:gray;overflow:hidden;">
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
                    <el-tab-pane v-for="d in fl" :label="d.gbsname">
                      <div style="text-align: left" v-for="x in xfl(d.gbsid)"><a href="#" @click="tiaochaxun(d.gbsid,x.gssid)">{{x.gssname}}</a></div>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-container>
      </div>
    </div>
    <div>
    <el-drawer
      ref="gwc"
      title="我是标题"
      :visible.sync="tk"
      :with-header="false"
      size="40%">
      <Gwc v-if="bo2" :drawer="gbgwc"></Gwc>
    </el-drawer>
    </div>

    <router-view v-if="bo"></router-view>

    <el-dialog id="yhdl" title="登录页面" :visible.sync="dlym" width="30%">
      <div >
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
            <el-button type="warning" round v-on:click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog id="shdl" title="商户登录页面" :visible.sync="shdlym" width="30%">
      <div >
        <el-form ref="shloginForm" :model="shform" :rules="shrules" label-width="80px" class="login-box">
          <el-form-item label="账号" prop="shyhm">
            <el-input type="text" placeholder="请输入账号" v-model="shform.shyhm" prefix-icon="el-icon-user-solid"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="shform.password" prefix-icon="el-icon-lock"/>
          </el-form-item>
          <el-form-item style="margin-right: 70px">
            <el-button type="primary" round v-on:click="shonSubmit('shloginForm')">登录</el-button>
            <el-button type="warning" round v-on:click="resetForm('shloginForm')">重置</el-button>
            <el-button type="primary" round v-on:click="jrzc">去注册</el-button>
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

    <el-dialog id="shzc" title="商户注册页面" :visible.sync="shzcym" width="30%">

      <el-row>

        <el-col>
          <el-form label-width="80px">
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

            <el-form-item style="margin-right: 70px">
              <el-button type="primary" @click="zcsq()">申请</el-button>
              <el-button type="primary" @click="fhdl()">返回</el-button>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>


    </el-dialog>


  </div>
</template>

<script>

  import Gwc from "../Goods/Gwc";
  export default {
    name: "navigation",
    components: {Gwc},
    data() {
      return {
        fl:[],
        xf:[],
        pdrr:[],
        gbgwc:this.$refs,
        stele:"",
        address:"",
        shm:"",
        shzh:"",
        mm:"",
        bo2:true,
        count:0,
        tk:false,
        dialogVisible: false,
        user: sessionStorage.getItem("yhname"),
        circleUrl:"./img/2.png",
        zcym:false,
        activeIndex: '1',
        shang: "",
        tabs: "left",
        dlym:false,
        shdlym:false,
        shzcym:false,
        form:{
          username: '',
          password: ''
        },
        shform:{
          shyhm: '',
          password: ''
        },
        registerForm: {
          username: '',
          password: ''
        },
        shregisterForm: {
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
        },bo:true
      };
    },
    methods: {
      getData(){
        var _this=this
        this.$axios.post("/queryAllGoodBigSortall.action").
        then(function(result) {
          _this.fl = result.data;
          //console.log(result)
          var daid=[];
          for (let i = 0; i < result.data.length; i++) {
            var params1 = new URLSearchParams();
            params1.append("gbsid", result.data[i].gbsid);
            _this.$axios.post("/queryGoodSmallsortBygbsid.action",params1).
            then(function(result1) {
              _this.pdrr[result.data[i].gbsid]=result1.data;
              _this.pdrr.push()
            }).
            catch(function(error) {
              alert(error)
            });
          }
        }).
        catch(function(error) {
          alert(error)
        });
      },
      xfl(val){
        return this.pdrr[val]
      },
      tiaochaxun(dfl,spxfl){
        sessionStorage.setItem("dfl",dfl)
        sessionStorage.setItem("spxfl",spxfl)
        var _this=this
        this.bo =false
        this.$nextTick(function(){
          this.bo = true
        })
        _this.$router.push("/navigation/fenlei");
      },
      fhdl(){
        this.shdlym=true;
        this.shzcym=false;
        this.resetForm("shloginForm");
      },
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
          _this.$router.push("/navigation/shouyemian")
        }).catch(function (error) {
          alert(error);
          console.log(error)
        });
      },
      jrzc(){
        this.shzcym=true;
        this.shdlym=false;
        this.shzh=sessionStorage.getItem("username");
        this.mm=sessionStorage.getItem("password");
      },
      sy(){
        location.reload();
        this.shang=""
        sessionStorage.removeItem("gid")
      },
      load () {
        this.count += 2
      },
      pdrrr(){
        if(this.user==null){
          this.dlym=true;
        }else {
          var _this = this;
          this.bo2 =false
          this.$nextTick(function(){
            this.bo2 = true
          })
          this.tk=true
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      search() {
        let goodsName = this.shang;
        //this.$router.push({path:"/demo1/v1",query:{goodsName}});
        var _this = this;
        this.bo =false
        this.$nextTick(function(){
          this.bo = true
        })
        _this.$router.push({path:"/navigation/search",query:{goodsName}});
       // this.bo =true
        //setInterval(function () {

        //},100)


        this.shang=""
      },
      shanghu() {
        if(this.user!=null){
          this.shdlym=true;
          this.resetForm("shloginForm");
        }else {
          this.$message({
            message: "请先登录用户",
            type: 'warning'
          });
        }
      },
      dkdl(){
        this.dlym=true;
      },
      dkzc(){
        this.zcym=true;
      },
      tcdl(){
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("password");
        sessionStorage.removeItem("yhname");
        this.user=null
        location.reload()
      },
      grzx(){
        this.$router.push("/navigation/userCenter")
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
                  _this.$router.push("/navigation/shouyemian")
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
                  sessionStorage.setItem("id",result.data.id);
                  sessionStorage.setItem("username",result.data.username);
                  sessionStorage.setItem("password",result.data.mm);
                  sessionStorage.setItem("yhname",result.data.yhname);
                  _this.user=result.data.yhname
                  _this.dlym=false
                  this.$refs.loginForm.resetFields();
                  _this.$router.push("/navigation/shouyemian")
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
      shonSubmit() {
        var _this = this;
        var params = new URLSearchParams();
        params.append("yhm", this.shform.shyhm);
        params.append("password", this.shform.password);

        this.$axios.post("shdl",params).then(function (result) {
          if (result.data.code == "0") {
            //登录成功  跳转 首页
            _this.$message({
              message: "欢迎:"+result.data.yhm,
              type: 'success',
            })
            //将登录成功的用户名存入store中
            sessionStorage.setItem("sname",result.data.yhm)
            sessionStorage.setItem("sid",result.data.sid)
            sessionStorage.setItem("y",result.data.y)
            _this.$router.push("/navigation/shgrzx");
            _this.shdlym=false;
          } else {
            //弹出消息  停留在该页面
            _this.$message({
              message: "错误:"+result.data.msg,
              type: 'warning',
            });
          }
        }).catch(function (error) {
          alert(error);
          console.log(error)
        });
      },
    },
    created() { //钩子函数  vue对象初始化完成后  执行
      this.getData();
      this.$router.push("/navigation/shouyemian")
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

  a{
    text-decoration: none;
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

  #yhdl{
    text-align: center;
  }

  #yhzc{
    text-align: center;
  }
  *{
    text-align: center;
  }
</style>

