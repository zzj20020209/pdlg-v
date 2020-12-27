<template>
  <el-form  :model="data" >
        <el-form-item label="类型名称">
          <el-input v-model="data.gbsname"></el-input>
        </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "editBigsort",
        props: ['data'],
    }
</script>

<style scoped>

</style>
