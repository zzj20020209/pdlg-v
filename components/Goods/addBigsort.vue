<template>
  <el-form  :model="data" >
    <el-row>
      <el-col :span="8">
        <el-form-item label="类型名称">
          <el-input v-model="data.gbsname"></el-input>
        </el-form-item></el-col></el-row>
  </el-form>
</template>
<script>
    export default {
        name: "addBigsort",
      props: ['data'],
    }
</script>

<style scoped>

</style>
