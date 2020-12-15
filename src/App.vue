<template>
<div id="app">
  <!--<sh></sh>-->
  <!--<shgrzx></shgrzx>-->
  <shzc></shzc>
</div>
</template>

<script>
  import Sh from '../components/Shanghu/Sh.vue'
  import Shgrzx from "../components/Shanghu/Shgrzx";
  import Shzc from "../components/Shanghu/Shzc";
  import Goods from "../components/Goods/Goods";

  export default {
    name: 'app',
    data() {
      return ""
    },
    components:{
      "sh":Sh,
      "shgrzx":Shgrzx,
      "shzc":Shzc,
      "Goods":Goods
    }
  }
</script>

<style>
*{
  text-align: center;
}
</style>
