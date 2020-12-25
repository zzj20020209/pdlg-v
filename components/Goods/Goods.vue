<template>
  <div id="Goods">
    <el-form :inline="true"  lclass="demo-form-inine">
      <el-form-item label="商品名称">
        <el-input v-model="goodsname" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
          <el-select v-model="gstatus" clearable  placeholder="请选择" >
            <el-option
                       key='1'
                       label='可用'
                       value='1'></el-option>
            <el-option
              key="2"
              label="不可用"
              value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="add()" type="warning">添加商品</el-button>
        <el-button @click="delduo()" type="warning">批量删除</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="tableSelected"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品类型:">
              <span>{{ props.row.gsid.goodBigSort.gbsname }}</span>
            </el-form-item>
            <el-form-item label="商品所属分类:">
              <span>{{ props.row.gsid.goodSmallsort.gssname }}</span>
            </el-form-item>
           <!-- <el-form-item label="商品状态:">
              <span>{{ props.row.gstatus==1?"可用":"不可用" }}</span>
            </el-form-item>-->
            <el-form-item label="商品详情图片:" v-if="props.row.goodsImagelist.length>0">
              <img v-for="e in props.row.goodsImagelist" style="width:80px;height:80px;border:none;" :src="$host + e.giurl">
            </el-form-item>
          </el-form>

        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
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
            <img style="width:80px;height:80px;border:none;" :src="$host + scope.row.gimage">
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click="editgoods(scope.row)">编辑</el-button>

          <el-popconfirm title="确定删除这条记录吗？" @confirm="delgoods(scope.row.gid)">
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination style="text-align: center;margin-top: 20px" background
                   @size-change="handleSizeChange" @current-change="pagechange"   :current-page="page"
                  layout="total, prev, pager, next,jumper,sizes" :total="total"
                   :page-size="pagesize" :page-sizes="[4,5,6]">
    </el-pagination>

    <div>
      <!-- 路由视图 -->

    </div>


    <el-dialog title="编辑页面" :visible.sync="dialogFormVisible" width="60%">
      <edit-goods :data="selectData" ref="editgoods"></edit-goods>
      <!--将编辑页面子组件加入到列表页面 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subEdit">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog :visible.sync="addFormVisible" width="60%">
      <el-form    ><!--:rules="rules"-->
        <!--  <el-form-item label="日期" :picker-options="pickerOptions">
            <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>-->
        <el-row>
          <el-col :span="10">
            <el-form-item label="商品名称" prop="gname">
              <el-input v-model="addgname"></el-input>
            </el-form-item></el-col>
          <el-col :span="10">
            <el-form-item label="商品规格" prop="gunit">
              <el-input v-model="addgunit"></el-input>
            </el-form-item></el-col>
          <el-col :span="10">
            <el-form-item label="商品价格" prop="gprice">
              <el-input v-model="addgprice"></el-input>
            </el-form-item></el-col>
          <el-col :span="10">
            <el-form-item label="商品图片">
              <el-upload
                class="avatar-uploader"
                :action="$host + 'fileUpload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="file">
                <img v-if="imageUrl" :src="$host + imageUrl" class="avatar" style="width: 100px;height: 80px">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item></el-col>
        </el-row>
        <el-row>

         <el-col :span="8">
          <el-form-item label="商品类型">
             <el-select @change="selectChangedf" v-model="sbid" placeholder="请选择" >
               <el-option v-for="e in addSelect"
                          :key="e.gbsid"
                          :label="e.gbsname"
                          :value="e.gbsid"></el-option>
             </el-select>

           </el-form-item></el-col>
          <el-col :span="8">
           <el-form-item label="商品所属分类">
             <el-select @change="selectChangedff" v-model="ssid"  placeholder="请选择" >
               <el-option v-for="e in getgss()"
                          :key="e.goodSmallsort.gssid"
                          :label="e.goodSmallsort.gssname"
                          :value="e.goodSmallsort.gssid"></el-option>
             </el-select>

           </el-form-item></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="商品详情图片">
              <el-upload
                :action="$host + 'fileUpload'"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="handleSuccess"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="$host + dialogImageUrl" alt="">
              </el-dialog>
              <!-- <img  v-for="e in fileList"
                     style="width:80px;height:80px;border:none;" :src="$host+e.path">-->
            </el-form-item>
          </el-col>
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

  /*import EditGoods from "./editGoods.vue";*/


    import editGoods from "./editGoods";

export default {
        name: "Goods",
      components: {editGoods: editGoods},
      data () {
        return {
          loading: true,
          tableData: [],
          dialogFormVisible: false,
          addFormVisible:false,
          total:1,
          page:1,
          pagesize:4,
          editForm: [],
          editSelect:[],
          gsid:0,
          goodsname:"",
          addgname:"",
          addgunit:"",
          addgprice:"",
          leixing:"",
          selectIndex:0,
          selectData:{},
          selectlength:0,
          str:"",
          imageUrl: '',
          sbid:"",
          addSelect:[],
          addSelectt:[],
          ssid:"",
          gstatus:"",
          fileList: [],
          dialogImageUrl: '',
          dialogVisible: false
        /*  editSelectt:[],
          editSelecttt:[]*/
         /* rules: {
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
          }*/
        }
      },
      methods: {
        getData() { //获取数据方法
          this.tableData=[];
          var _this = this;
          var params = new URLSearchParams();
          params.append("page", this.page);
          params.append("size", this.pagesize);
          params.append("gname", this.goodsname);
          if(this.gstatus==""){
            params.append("gstatus", 0);
          }else{
            params.append("gstatus", parseInt(this.gstatus));
          }

          this.$axios.post("/queryGoods.action",params).
          then(function(result) {
            _this.loading=false;
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
              type: 'success'
            });
          })

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
          this.selectIndex = val.id;
          this.selectData = {...val};
          console.log("选择： ",val)

         /* var _this = this;
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
          var _this = this;
          let mids="";
        let fileList= this.$refs.editgoods.fileList
          fileList.forEach(i =>{
            mids=mids+i.url.substring(22)+","
          })
         // dd
          var params = new URLSearchParams();
          params.append("gid", this.selectData.gid);
          params.append("gname", this.selectData.gname);
          params.append("gunit", this.selectData.gunit);
          params.append("gprice", this.selectData.gprice);
          params.append("gimage", this.selectData.gimage);
          params.append("gssid", parseInt(this.selectData.gsid.gsid));
          params.append("mids", mids);
          this.$axios.post("updateGoods.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.dialogFormVisible=false
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '修改失败',
              type: 'success'
            });
          })
        },
        onSubmit(){
          this.getData();
        },
        add(){
          this.addFormVisible = true;
          var _this = this;
          this.$axios.post("queryAllGoodBigSortall.action").
          then(function(result) {
            _this.addSelect=result.data

          }).
          catch(function() {

          });
          this.$axios.post("queryGoodSort.action").
          then(function(result) {
            _this.addSelectt=result.data

          }).
          catch(function() {

          });
        },
        getgss(){
          var sbid =this.sbid;
          var temparr =this.addSelectt.filter(function(item){
            return item.goodBigSort.gbsid ==sbid;
          });
          return temparr;
        },
        selectChangedf(){
          this.ssid=""
        },
        selectChangedff(){
          var _this = this;
          var sbid =this.sbid;
          var ssid =this.ssid;
          this.addSelectt.filter(function(item){
            if(item.goodBigSort.gbsid ==sbid &&item.goodSmallsort.gssid==ssid){
              _this.gsid=item.gsid
            }
          });
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
        },
        tableSelected(val){
          /*console.log("人员信息val-",val);*/
          if(val.length<1){
            this.selectlength=0;
          }
          this.selectlength=val.length;
          this.multipleSelection = [];
          for (let i = 0; i < val.length; i++) {
            if (this.multipleSelection.indexOf(val[i].gid) === -1) {
              this.multipleSelection.push(val[i].gid)
            }
          }
          let str="";
          this.multipleSelection.forEach((item)=> {
           str=str+item+","
          })
          this.str=str;
          console.log("人员信息val--人员选中-",str);
        },
        delduo(){
          alert(this.selectlength)
         if(this.selectlength<1){
             this.$message.error('请至少选择一条数据');
          }else{
           var _this = this;
           var params = new URLSearchParams();
           params.append("ids", _this.str);
           this.$axios.post("deletezhanghao.action", params).
           then(function(result) {
             _this.$message({
               message: result.data.msg,
               type: 'success'
             });
             //刷新数据
             _this.getData();

           }).
           catch(function() {
             _this.$message({
               message: '删除失败',
               type: 'success'
             });
           })
          }
        },
        sumbitaddRow(){
          var _this = this;
          console.log(this.fileList)
          let mids="";
          this.fileList.forEach(function(item){
            mids=mids+item.path+","
          });
          mids=mids+_this.imageUrl
          var params = new URLSearchParams();
          params.append("gname", _this.addgname);
          params.append("gunit", _this.addgunit);
          params.append("gprice", _this.addgprice);
          params.append("gimage", _this.imageUrl);
          params.append("gssid", _this.gsid);
          params.append("mids", mids);
          this.$axios.post("addGoods.action", params).
          then(function(result) {
            _this.$message({
              message: result.data,
              type: 'success'
            });
            _this.addFormVisible=false
            //刷新数据
            _this.getData();

          }).
          catch(function() {
            _this.$message({
              message: '添加失败',
              type: 'success'
            });
          })
        },
        handleAvatarSuccess(res, file) {
          console.log(res.msg)
          this.imageUrl = res.msg;
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        //移除图片
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        //上传成功调用
        handleSuccess(data,file, fileList) {
          if (data.flag) {
            this.$message.success("上传成功");
            console.log("上传成功 ： ",data);
            file.url = this.$host + data.msg;
            file.path = data.msg;
            this.fileList = fileList;
          }else {
            this.$message.error(data.msg);
          }
        },
        //点击图片， 将图片传给模态框， 放大图片
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      },
      created() { //钩子函数  vue对象初始化完成后  执行
        this.getData();
        //this.selectAll();
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
