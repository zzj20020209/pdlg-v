<template>
  <!--<div>
    <input type="text" v-model="data.gid"/><br>m*;
    <input type="text" />
  </div>-->
  <el-form  :model="data" >
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
        <el-form-item label="商品图片">
          <!--<el-input v-model="data.gunit"></el-input>-->
          <template width="90" >
            <el-upload
              class="avatar-uploader"
              :action="$host + 'fileUpload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="file">
              <el-image   v-if="imageUrl" :src="imageUrl" >
              </el-image>

            </el-upload>

          </template>
        </el-form-item></el-col>

      <el-col :span="8">
        <el-form-item label="商品类型">
          <el-select @change="selectChanged" v-model="sbid" placeholder="请选择" >
            <el-option v-for="e in editSelect"
                       :key="e.gbsid"
                       :label="e.gbsname"
                       :value="e.gbsid"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="商品所属分类">
          <el-select @change="selectChangedd" v-model="ssid"  placeholder="请选择" >
            <el-option v-for="e in getgss()"
                       :key="e.goodSmallsort.gssid"
                       :label="e.goodSmallsort.gssname"
                       :value="e.goodSmallsort.gssid"></el-option>
          </el-select>

        </el-form-item></el-col>
    </el-row>
    {{gsid}}
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
            alert(this.data.gimage);
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
          }
        },
        created() { //钩子函数  vue对象初始化完成后  执行
          this.selectAll();

        },
    }
</script>

<style scoped>

</style>
