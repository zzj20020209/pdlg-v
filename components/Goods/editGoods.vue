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
          <el-input v-model="data.gunit"></el-input>
        </el-form-item></el-col>

      <!--<el-col :span="8">
        <el-form-item label="商品类型">
          <el-select v-model="data.goodSort.gsid" placeholder="请选择" >
            <el-option v-for="e in editSelect"
                       :key="e.gsid"
                       :label="e.gsname"
                       :value="e.gsid"></el-option>
          </el-select>
        </el-form-item></el-col>-->
    </el-row>
  </el-form>
</template>



<script>
    export default {

        name: "editGoods",
        props: ['data'],
        data(){
          return{

            leixing:"",
            editSelect:[],
          }
        },
        methods:{
          selectAll(){

            var _this = this;
            this.$axios.post("queryAllGoodSortname.action").
            then(function(result) {

              _this.editSelect=result.data

            }).
            catch(function() {

            });
          },
        },
        created() { //钩子函数  vue对象初始化完成后  执行
          //this.selectAll();
        },
    }
</script>

<style scoped>

</style>
