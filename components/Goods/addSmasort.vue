<template>
  <el-form  :model="data" >
    <el-row>
      <el-col :span="8">
        <el-form-item label="所属分类名称">
          <el-input v-model="data.gssname"></el-input>
        </el-form-item></el-col></el-row>
  </el-form>
</template>

<script>
    export default {
        name: "addSmasort",
      props: ['data'],
    }
</script>

<style scoped>

</style>
