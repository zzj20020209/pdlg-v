<template>
  <el-form  :model="data" >
    <el-row>
      <el-col :span="8">
        <el-form-item label="仓库名称">
          <el-input v-model="data.wname"></el-input>
        </el-form-item></el-col></el-row>
    <el-row> <el-col :span="8">
        <el-form-item label="仓库地址">
          <el-input v-model="data.waddress"></el-input>
        </el-form-item></el-col>
    </el-row>
    <el-row> <el-col :span="8">
      <el-form-item label="仓库库存">
        <el-input v-model="data.wzkucun"></el-input>
      </el-form-item></el-col>
    </el-row>
  </el-form>
</template>

<script>
    export default {
        name: "addWarehouse",
        props: ['data'],
    }
</script>

<style scoped>

</style>
