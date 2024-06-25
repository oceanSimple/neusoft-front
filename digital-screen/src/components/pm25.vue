<template>
  <div class="container">
    <div>pm2.5</div>
    <div id="pm25" style="width: 300px;height: 300px"></div>
  </div>

</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import * as echarts from 'echarts';
import requests from "../util/request.js";

let value = ref(60);
let option = reactive({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '50%',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
});
let xData = ref([])
let yData = ref([])
const getPm25Data = () => {
  requests.get('/screen/pm25').then(res => {
    let data = res.data
    // 将data处理成x，y轴的数据
    data.forEach(item => {
      xData.value.push(item.province)
      yData.value.push(item.value)
    })
    option.xAxis[0].data = xData
    option.series[0].data = yData
  });
}
watch(xData.value, (newValue, oldValue) => {
  let myChart = echarts.init(document.getElementById('pm25'));
  myChart.setOption(option);
})
onMounted(() => {
  getPm25Data();
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f0f0f0;
}
</style>