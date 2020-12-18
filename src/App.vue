<template>
<div id="app">
  <!--<sh></sh>-->
  <!--<shgrzx></shgrzx>-->
  <router-view></router-view>
<!--  <gwc></gwc>-->
</div>
</template>

<script>
  import Sh from '../components/Shanghu/Sh.vue'
  import Shgrzx from "../components/Shanghu/Shgrzx";
  import Shzc from "../components/Shanghu/Shzc";
  import Gwc from "../components/Goods/Gwc";

  export default {
    name: 'app',
    data() {
      return ""
    },
    components:{
      "gwc":Gwc,
      "sh":Sh,
      "shgrzx":Shgrzx,
      "shzc":Shzc
    }
  }
</script>

<style>
*{
  text-align: center;
}
</style>
