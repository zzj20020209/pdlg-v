<template>
  <div>

  <div id="da" style="text-align: center">
    <el-row>
      <el-col>
        <div style="text-align: center">
            <el-form :inline="true"  class="demo-form-inline">
              <el-form-item >
                <el-select v-model="shanghu" clearable  placeholder="选择商户" >
                  <el-option v-for="sl in shlb"
                    key='1'
                    :label='sl.sname'
                    :value='sl.sid'>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-table
              :data="msg2"
              ref="gwcb"
              >
              <el-table-column
                width="530px" align="center" label="订单">
                <template slot-scope="scope">
                  <a href="#" @click="jrxq(scope.row.gwname)">
                    <img style="width:200px;height:200px;border:none;" :src="$host+scope.row.gwimage"><br>
                    <label>{{scope.row.gwname}}</label><br>
                    <label style="font-size: 18px"><font color="red">￥</font>{{scope.row.gwprice}}【{{scope.row.gwunit}}】</label><br>
                    <label style="font-size: 18px">{{scope.row.gwsl}}份</label>
                  </a>
                </template>
              </el-table-column>
            </el-table>

        </div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
    export default {
        name: "goumai",
      data() {
        return {
          zprice:0,
          xz:0,
          gid:0,
          id:"",
          msg2: [],
          count: 1,
          innerDrawer: false,
          dingdan:[],
          dds:"",
          shanghu:"",
          shlb:[]
        }
      },
      methods: {

        handleClose(done) {
          this.$confirm('还有未保存的工作哦确定关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {
            });
        },
        getData() { //获取数据方法
          var _this=this;
          this.dingdan=sessionStorage.getItem("dd")+"";
          var params = new URLSearchParams();
          params.append("gwid", this.dingdan);
          this.$axios.post("gwidcx.action", params).
          then(function(result) {
            _this.loading=false;
            _this.msg2 = result.data;
          }).
          catch(function() {
          })

          var pa = new URLSearchParams();
          pa.append("page",1)
          pa.append("rows",100)
          this.$axios.post("/shcxs", pa).
          then(function(result) {
            _this.loading=false;
            _this.shlb=result.data.rows;
          }).
          catch(function() {
          })
        },
      },created() { //钩子函数  vue对象初始化完成后执行
        this.id=sessionStorage.getItem("id")
        this.getData();
      }
    }
</script>

<style scoped>
  .imgs {
    height: 200px;
    width: 300px;
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
    width: 750px;
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
  a{
    text-decoration: none;
  }
</style>
