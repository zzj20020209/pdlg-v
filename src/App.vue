<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <navigation></navigation>
    <Classify></Classify>
    <slideshow></slideshow>
    <commodity></commodity>
  </div>
</template>

<script>
  import Classify from "../components/shouye/classify";
  import navigation from "../components/shouye/navigation";
  import commodity from "../components/shouye/commodity";
  import slideshow from "../components/shouye/slideshow";
  export default {
    name: 'app',
    components: {
      navigation,
      Classify,
      slideshow,
      commodity
    },
    data() {
      return {

      }
    },
  }
</script>

<style>
  *{
    margin: 0px;
    padding: 0px;
    text-align: center;
  }

  body{
    background-color: gainsboro;
  }
</style>
