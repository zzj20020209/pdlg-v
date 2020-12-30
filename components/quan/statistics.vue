<template>
  <div>
    <el-row>
      <el-col :span="15">
        <div id="mains" style="width:650px;height:400px;"></div>
      </el-col>
      <el-col :span="9">
        <div id="xiao" style="width:400px;height:400px;"></div>
      </el-col>
    </el-row>
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
      var echarts = require('echarts');
      var yue = "5,4,3,2,1,0"
      this.$axios.post("/queryStatistics.action?yue=" + yue).
      then(result => {
        result.data.forEach((item)=>{
          this.time.push(item.nian+"年"+item.times+"月");
          this.price.push(item.price);
        })
        var myChart = echarts.init(document.getElementById('mains'));
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

        this.$axios.post("/queryGoodes.action").
        then(result=>{
          var myCharts = echarts.init(document.getElementById('xiao'));
          let xiao = [];
          let name = []
          result.data.forEach((item=>{
            xiao.push({value:item.oxcount, name: item.gname});
            name.push(item.gname);
          }))
          myCharts.setOption( {
            title: {
              text: '商品销量前五',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: name
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: xiao,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
          console.log(xiao)
        }).
        catch(erreo=>{
          alert(erreo)
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
