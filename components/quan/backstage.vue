<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div id="dage" style="height: 150px;width: 100%">
          <h1>欢迎进入胖达乐购后台管理</h1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-menu
          style="height: 750px"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <template v-for="menu in this.menuData">
            <el-submenu :key="menu.id" :index="menu.id">
              <template slot="title">
                <!-- <i :class="menu.icon"></i>-->
                <span slot="title">{{ menu.lable }}</span>
              </template>
              <el-menu-item-group>
                <div v-for="cmenu in menu.childMenu">
                  <el-menu-item @click="addTab(cmenu.lable,cmenu.linkUrl)" :key="cmenu.id" :index="cmenu.id">
                    <!--<i :class="cmenu.icon"></i>-->
                    <span slot="title">{{ cmenu.lable }}</span>
                  </el-menu-item>
                </div>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
      <el-col :span="18" class="el-col-offset-1">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
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
import Gwc from "../Goods/Gwc";

export default {
  name: "backstage",
  data() {
    return {
      menuChild: [],
      menuData: [],
      editableTabsValue: '1',
      editableTabs: [],
      tabIndex: 0,
    }
  }
  , components: {
    employee,
    Sh,
    Goods
  },
  methods: {
    getDate() {
      let _this = this;
      this.$axios.post("/queryMenuAll.action").then(function (result) {
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
</style>
