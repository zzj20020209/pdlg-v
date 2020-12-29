<template>
  <div>
    <div id="main" style="width:650px;height:300px;"></div>
  </div>
</template>

<script>
export default {
  name: "statistics",
  data() {
    return {
      time:[],
      price:[]
    }
  },
  methods: {
    gedata() {
      var echarts = require('echarts/lib/echarts');
      require('echarts/lib/chart/bar');
      require('echarts/lib/component/tooltip');
      require('echarts/lib/component/title');

      var yue = "5,4,3,2,1,0"
      this.$axios.post("/queryStatistics.action?yue=" + yue).
      then(result => {
        result.data.forEach((item)=>{
          this.time.push(item.nian+"年"+item.times+"月");
          this.price.push(item.price);
        })
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption({
          title: {
            text: '总店最近六月收入'
          },
          tooltip: {},
          xAxis: {
            data: this.time
          },
          yAxis: {},
          series: [{
            name: '总收入',
            type: 'bar',
            data: this.price
          }]
        })
      }).catch(error => {
        alert(error)
      })
    }
  }, mounted() {
    this.gedata()
  }

}
</script>

<style scoped>

</style>
