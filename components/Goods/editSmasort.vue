<template>
  <el-form  :model="data" >
    <el-form-item label="所属分类名称">
      <el-input v-model="data.gssname"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "editSmasort",
      props: ['data'],
    }
</script>

<style scoped>

</style>
