<template>
  <div >
    <el-row>
      <el-col :span="24" id="tp">
        <img src="img/pa.jpg" style="height: 100px;width: 300px">
      </el-col></el-row>
    <el-row style="border: 1px solid whitesmoke">
      <el-col :span="4">
        <el-menu
          style="height: 750px;"
          text-color="black"
          background-color="whitesmoke"
          active-text-color="#ffd04b">
          <template v-for="menu in this.menuData">
            <el-submenu :key="menu.id" :index="menu.id">
              <template slot="title">
                <!-- <i :class="menu.icon"></i>-->
                <span slot="title">{{ menu.label }}</span>
              </template>
              <el-menu-item-group>
                <div v-for="cmenu in menu.children">
                  <el-menu-item @click="addTab(cmenu.label,cmenu.linkUrl)" :key="cmenu.id" :index="cmenu.id">
                    <!--<i :class="cmenu.icon"></i>-->
                    <span slot="title">{{ cmenu.label }}</span>
                  </el-menu-item>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="18"  >
        <!-- <div v-if="editableTabsValue==0">
           <span>aaaaa</span>
         </div>-->
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane >
            <span slot="label"><i class="el-icon-date"></i> 首页</span>
            <el-row >
              <el-col :span="7" >
                  <el-col :span="24" >
                    <el-row ><el-col :span="24" style="padding-left: 3px;border: 1px solid whitesmoke">
                      <div class="block"><el-avatar :size="100" src="imgs/1.jpg"></el-avatar>
                        <div class="inline" ><span>{{username}}</span> <a href="#" @click="zx">注销</a>
                          <br> <span>{{nowDate}}</span> </div></div>
                    </el-col>

                    </el-row>
                  </el-col>

              </el-col>
              <el-col :span="14" class="el-col-offset-1">
                <el-col :span="24">
                  <el-row ><el-col :span="24" style="padding-left: 3px;border: 1px solid whitesmoke">
                    <div class="block"><el-avatar :size="100" src="imgs/1.jpg"></el-avatar>
                      <div class="inline" ><span>{{username}}</span> <a href="#" @click="zx">注销</a>
                        <br> <span>{{nowDate}}</span> </div></div>
                  </el-col>

                  </el-row>
                </el-col>
              </el-col>
            </el-row>

          </el-tab-pane>
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <component :is="item.content"></component>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import employee from "./employee";
  import Goods from "../Goods/Goods";
  import Sh from "../Shanghu/Sh";
  import ShSp from "../Shanghu/ShSp";
  import warehouse from "../Warehouse/warehouse";
  import Supply from "../Warehouse/Supply";
  import caigou from "../caigou/caigou";
  import goodsort from "../Goods/goodsort";
  import role from "./role";
  import rolelink from "./rolelink";
  import UserList from "../User/UserList";
  import jurisdiction  from "./jurisdiction";
  export default {
    name: "backstage",
    data() {
      return {
        menuChild: [],
        menuData: [],
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        username:sessionStorage.getItem("username"),
        nowDate: "",

      }
    }
    ,
    components: {
      employee,
      Sh,
      Goods,
      ShSp,
      warehouse,
      Supply,
      caigou,
      goodsort,
      jurisdiction,
      role,
      rolelink,
      UserList
    },
    methods: {
      getDate() {
        let _this = this;
        this.$axios.post("/queryMenuAll.action?id="+sessionStorage.getItem("id")).then(function (result) {
          _this.menuData = result.data;
        }).catch(function (erreo) {
          alert(erreo)
        })
      },
      addTab(titleName, comval) {
        var res = this.editableTabs.filter((item) => {
          return item.title == titleName
        });
        if (res.length == 0) {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: titleName,
            name: newTabName,
            content: comval
          });
          this.editableTabsValue = newTabName;
        } else {
          this.editableTabsValue = res[0].name;
        }

      },
      zx(){
        sessionStorage.removeItem("username");
        this.$router.push("/")
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      currentTime() {
        setInterval(this.formatDate, 500);
      },
      formatDate() {
        let date = new Date();
        let year = date.getFullYear(); // 年
        let month = date.getMonth() + 1; // 月
        let day = date.getDate(); // 日
        let week = date.getDay(); // 星期
        let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
        let hour = date.getHours(); // 时
        hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
        let minute = date.getMinutes(); // 分
        minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
        let second = date.getSeconds(); // 秒
        second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
        this.nowDate = `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${weekArr[week]}`;
      }
    },
    mounted() {
      this.currentTime();
    },
    // 销毁定时器
    beforeDestroy() {
      if (this.formatDate) {
        clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
      }
    },
    created() {
      this.getDate();
    }
  }
</script>

<style scoped>
  #dage{
    text-align: center  ;
  }
  #tp{
    text-align: center;
  }

</style>
