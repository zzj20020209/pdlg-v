<template>
<div>
  <el-form  :model="data" >
    <el-row>
      <el-col :span="8">
        <el-form-item label="仓库名称">
          <el-input v-model="data.wname"></el-input>
        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="仓库地址">
          <el-input v-model="data.waddress"></el-input>
        </el-form-item></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item label="仓库库存">
          <el-input v-model="data.wzkucun" :disabled="true"></el-input>
        </el-form-item></el-col>
      <el-col :span="8">
        <el-form-item label="仓库剩余库存">
          <el-input v-model="data.wskucun" :disabled="true"></el-input>
        </el-form-item></el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
    export default {
        name: "editWarehouse",
        props: ['data'],
        data(){
          return{

          }
        }
    }
</script>

<style scoped>

</style>
