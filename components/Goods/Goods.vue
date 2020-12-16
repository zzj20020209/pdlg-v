<template>
  <div id="Goods">
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="goodsname" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="add()" type="warning">添加商品</el-button>
        <a>hhh</a>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品类型:">
              <span>{{ props.row.gsid.goodBigSort.gbsname }}</span>
            </el-form-item>
            <el-form-item label="商品所属分类:">
              <span>{{ props.row.gsid.goodSmallsort.gssname }}</span>
            </el-form-item>
            <el-form-item label="商品所属分类:">
              <span>{{ props.row.gsid.goodSmallsort.gssname }}</span>
            </el-form-item>
          </el-form>

        </template>
      </el-table-column>
      <el-table-column prop="gid" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="gname" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="gunit" label="商品规格">
      </el-table-column>
      <el-table-column prop="gprice" label="商品价格">
      </el-table-column>
      <el-table-column label="商品图片">
        <template width="90" slot-scope="scope">
          <img style="width:80px;height:80px;border:none;" :src="scope.row.gimage">
        </template>
      </el-table-column>
     <!-- <el-table-column prop="gsid.goodBigSort.gbsname" label="商品类型">
      </el-table-column>-->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="editgoods(scope.row.gid)">编辑</el-button>

          <el-popconfirm title="确定删除这条记录吗？" @confirm="delgoods(scope.row.gid)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="text-align: center;margin-top: 20px"  @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                  layout="total, prev, pager, next,sizes" :total="total"
                   :page-size="pagesize" :page-sizes="[2,3,4]">
    </el-pagination>

    <div>
      <!-- 路由视图 -->

    </div>


    <el-dialog title="编辑页面" :visible.sync="dialogFormVisible">
      <edit-goods :data="selectData"></edit-goods>
      <!--将编辑页面子组件加入到列表页面 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!--<el-dialog :visible.sync="editFormVisible">
      <el-form  :model="editForm" >
      &lt;!&ndash;  <el-form-item label="日期" :picker-options="pickerOptions">
          <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>&ndash;&gt;
        <el-row>
          <el-col :span="8">
        <el-form-item label="商品名称">
          <el-input v-model="editForm.gname"></el-input>
        </el-form-item></el-col>
          <el-col :span="8">
        <el-form-item label="商品规格">
          <el-input v-model="editForm.gunit"></el-input>
        </el-form-item></el-col>
          <el-col :span="8">
        <el-form-item label="商品价格">
          <el-input v-model="editForm.gprice"></el-input>
        </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
        <el-form-item label="商品图片">
          <el-input v-model="editForm.gunit"></el-input>
        </el-form-item></el-col>
          <el-col :span="8">
        <el-form-item label="商品类型">
          <el-select v-model="gsid" placeholder="请选择" >
            <el-option v-for="e in editSelect"
                       :key="e.gsid"
                       :label="e.gsname"
                       :value="e.gsid"></el-option>
          </el-select>
        </el-form-item></el-col>
        </el-row>
      </el-form>
      <div>
        <el-button @click="closeDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitEditRow()">确定</el-button>
      </div>
    </el-dialog>-->

    <el-dialog :visible.sync="addFormVisible">
      <el-form    :rules="rules">
        <!--  <el-form-item label="日期" :picker-options="pickerOptions">
            <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>-->
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品名称" prop="gname">
              <el-input v-model="editgname"></el-input>
            </el-form-item></el-col>
          <el-col :span="8">
            <el-form-item label="商品规格" prop="gunit">
              <el-input v-model="editgunit"></el-input>
            </el-form-item></el-col>
          <el-col :span="8">
            <el-form-item label="商品价格" prop="gprice">
              <el-input v-model="editgprice"></el-input>
            </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品图片">
              <el-input v-model="editgunit"></el-input>
            </el-form-item></el-col>
         <!-- <el-col :span="8">
            <el-form-item label="商品类型" prop="leixing">
              <el-select v-model="leixing" placeholder="请选择" >
                <el-option v-for="e in editSelect"
                           :key="e.gsid"
                           :label="e.gsname"
                           :value="e.gsid"></el-option>
              </el-select>
            </el-form-item></el-col>-->
        </el-row>
      </el-form>
      <div>
        <el-button @click="closeaddDialog()">取消</el-button>
        <el-button type="primary" @click="sumbitaddRow()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

/*  import EditGoods from "./editGoods.vue";*/


    import editGoods from "./editGoods";

export default {
        name: "Goods",
      components: {editGoods: editGoods},
      data () {
        return {
          tableData: [],
          dialogFormVisible: false,
          addFormVisible:false,
          total:1,
          page:1,
          pagesize:2,
          editForm: [],
          editSelect:[],
          gsid:0,
          goodsname:"",
          editgname:"",
          editgunit:"",
          editgprice:"",
          leixing:"",
          selectIndex:0,
          selectData:{},
          rules: {
            //需要校验的字段名
            gname: [
              //每一个对象都是一个校验规则
              { required: true, message: '商品名称必填项', trigger: ['change','blur'] },
              { pattern: /^1\d{4,10}$/, message: '账号是1开头5-11的数字', trigger: ['blur', 'change'] }
            ],
            gunit: [
              { required: true, message: '密码必填项', trigger: ['change','blur'] },
              { pattern: /^\w{3,12}$/, message: '密码必须是3-12的字符', trigger: ['blur', 'change'] }
            ]
          }
        }
      },
      methods: {
        getData() { //获取数据方法
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("gname", this.goodsname);
          this.$axios.post("/queryGoods.action",params).
          then(function(result) {
            _this.tableData = result.data.rows;
            _this.total = result.data.total;
          }).
          catch(function(error) {
            alert(error)
          });

        },
        delgoods(val) { //删除数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("gid", val);

          this.$axios.post("deleteGoods.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });

            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '删除失败',
              type: 'error'
            });
          });

        },
        selectAll(){
          var _this = this;
          this.$axios.post("queryAllGoodSortname.action").
          then(function(result) {
            _this.editSelect=result.data

          }).
          catch(function() {

          });
        },
        editgoods(val) { //编辑按钮按下  打开编辑模态框
          //获取到要编辑的巨记录  通过val（id）
          this.dialogFormVisible = true;
          for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i].gid == val){
              this.selectIndex = i;
              this.selectData = {...this.tableData[i]};
            }
          }
          /*var _this = this;
          var params = new URLSearchParams();
          params.append("gid", val);

          this.$axios.post("queryGoodsBygid.action", params).
          then(function(result) {
              _this.editForm=result.data
              _this.gsid=result.data.goodSort.gsid
          }).
          catch(function() {

          });*/

        },
        subEdit() {
          //console.log(this.tableData[this.selectIndex])
          let data = this.tableData[this.selectIndex];
          data.gid = this.selectData.gid;
        },
        onSubmit(){
          this.getData();
        },
        add(){
          this.addFormVisible = true;
        },
        pagechange(pageindex){
          this.tableData=[];
          //页码变更时
          //console.log(pageindex)
          this.page = pageindex;
          //根据pageindex  获取数据
          this.getData();
        },handleSizeChange(size){
          this.tableData=[];
          //页码变更时
          //console.log(pageindex)
          this.pagesize = size;
          //根据pageindex  获取数据
          this.getData();
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
        this.selectAll();
      },
    }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
