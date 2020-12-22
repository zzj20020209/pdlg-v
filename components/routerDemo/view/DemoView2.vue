<template>
    <div>

      这是DemoView2首页
      <br>
      <router-link to="/demo1">跳转到DemoView1页面</router-link>


      <el-button @click="showFileList">打印文件列表</el-button>
      <!--多文件上传-->
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
      <img  v-for="e in fileList"
        style="width:80px;height:80px;border:none;" :src="$host+e.path">
    </div>
</template>

<script>
    export default {
      name: "DemoView2",
      data() {
        return {
          fileList: [],
          dialogImageUrl: '',
          dialogVisible: false
        };
      },
      methods: {
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
        },
        showFileList() {
          console.log(this.fileList)
          this.fileList.forEach(function(item){
            alert(item.path)
          });
        }
      }
    }
</script>

<style scoped>

</style>
