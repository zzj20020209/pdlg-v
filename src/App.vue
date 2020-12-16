<template>
  <div id="app">
    <sh></sh>
    <!--<shgrzx></shgrzx>-->
  </div>
</template>

<script>
  import Sh from '../components/Shanghu/Sh.vue'
  import Shgrzx from "../components/Shanghu/Shgrzx";
  import Goods from "../components/Goods/Goods";
  /*import Edituser from "../components/edituser.vue"*/

  export default {
    name: 'app',
    data() {
      return ""
    },
    components:{
      "sh":Sh,
      "shgrzx":Shgrzx,
      "Goods":Goods

    }
  }
</script>

<style>
  *{
    text-align: center;
  }
</style>
