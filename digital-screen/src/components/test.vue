<template>
  <div id="test" style="width: 600px;height:400px;"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted} from "vue";


let option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('test'));
  myChart.setOption(option);
});
</script>

<style scoped>

</style>