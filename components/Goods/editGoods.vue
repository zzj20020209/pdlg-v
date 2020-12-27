<template>
  <!--<div>
    <input type="text" v-model="data.gid"/><br>m*;
    <input type="text" />
  </div>-->

  <el-form  :model="data" ref="r" >
      <!--<el-form-item label="日期" :picker-options="pickerOptions">
    <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"></el-date-picker>
  </el-form-item>&ndash;&gt;-->
    <el-row>
      <el-col :span="8">
        <el-form-item label="商品名称">
          <el-input v-model="data.gname"></el-input>
        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="商品规格">
          <el-input v-model="data.gunit"></el-input>
        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="商品价格">
          <el-input v-model="data.gprice"></el-input>
        </el-form-item></el-col>
    </el-row>
    <el-row>

      <el-col :span="8">
        <el-form-item label="商品类型" prop="gbsname">
          <el-select @change="selectChanged" v-model="sbid" placeholder="请选择" >
            <el-option v-for="e in editSelect"
                       :key="e.gbsid"
                       :label="e.gbsname"
                       :value="e.gbsid"></el-option>
          </el-select>

        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="商品所属分类">
          <el-select @change="selectChangedd" v-model="ssid"  placeholder="请选择" >
            <el-option v-for="e in getgss()"
                       :key="e.goodSmallsort.gssid"
                       :label="e.goodSmallsort.gssname"
                       :value="e.goodSmallsort.gssid"></el-option>
          </el-select>

        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="商品图片" prop="img">
          <!--<el-input v-model="data.gunit"></el-input>-->
          <template width="90" >
            <el-upload
              class="avatar-uploader"
              :action="$host + 'fileUpload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              name="file">
              <el-image   v-if="imageUrl" :src="imageUrl" >
              </el-image>
            </el-upload>
          </template>
        </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="商品详情图片">
          <el-upload
            :action="$host + 'fileUpload'"
            :file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="$host + dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
      </el-col>
    </el-row>
  <!--  {{gsid}}
    <el-button @click="showFileList">打印文件列表</el-button>-->
  </el-form>
</template>



<script>
    export default {

        name: "editGoods",
        props: ['data'],
        data(){
          return{
            imageUrl: '',
            editSelect:[],
            editSelectt:[],
            sbid:0,
            ssid:0,
            gsid:0,
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false
          }
        },
        watch: {
          data() {
            this.selectAll();
            this.fileList = [];
            this.data.goodsImagelist.forEach(i => {
              console.log(i);
              this.fileList.push({
                name: i.gid,
                url: this.$host + i.giurl
              })

            })
            console.log(this.fileList);
          }
        },
        methods:{
          selectAll(){

            var _this = this;
            _this.sbid=this.data.gsid.goodBigSort.gbsid
            _this.ssid=this.data.gsid.goodSmallsort.gssid
            _this.gsid=this.data.gsid.gsid
            _this.imageUrl=this.$host + this.data.gimage;
            this.$axios.post("queryAllGoodBigSortall.action").
            then(function(result) {
              _this.editSelect=result.data

            }).
            catch(function() {

            });
            this.$axios.post("queryGoodSort.action").
            then(function(result) {
              _this.editSelectt=result.data

            }).
            catch(function() {

            });

          },
          getgss(){
            var sbid =this.sbid;
            var temparr =this.editSelectt.filter(function(item){
              return item.goodBigSort.gbsid ==sbid;
            });
            return temparr;
          },
          selectChanged(){
            this.ssid=""
          },
          selectChangedd(){
            var _this = this;
            var sbid =this.sbid;
            var ssid =this.ssid;
            this.editSelectt.filter(function(item){
              if(item.goodBigSort.gbsid ==sbid &&item.goodSmallsort.gssid==ssid){
               _this.gsid=item.gsid
                _this.data.gsid.gsid=_this.gsid
              }
            });
          },
          handleAvatarSuccess(res, file) {
            var _this = this;
            console.log(res.msg)
            this.imageUrl = this.$host + res.msg;
            this.data.gimage=res.msg;

          },
          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isJPG && isLt2M;
          },
          //移除图片
          handleRemove(file, fileList) {
            alert("aaa")
            console.log(file, fileList);
            this.fileList=fileList
            alert(this.fileList.length)
            alert(this.fileList)
         /*   // 1.获取将要删除图片的临时路径
            const filePath = file.response.data.tmp_path
            // 2.从pics数组中，找到图片对应的索引值
            const i = this.fileList.findIndex(x => x.pic === filePath)
            // 3.调用splice方法，移除图片信息
            this.formData.splice(i, 1)*/

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
          },
          showFileList() {
            console.log(this.fileList)
            this.fileList.forEach(function(item){
              alert(item.path)
            });
          }
        },
        created() { //钩子函数  vue对象初始化完成后  执行


        },
        mounted() {
          this.selectAll();
          this.data.goodsImagelist.forEach(i => {
            console.log(i);
            this.fileList.push({
              name: i.gid,
              url: this.$host + i.giurl
            })

          })
          console.log(this.fileList);
        }
    }
</script>

<style scoped>

</style>
