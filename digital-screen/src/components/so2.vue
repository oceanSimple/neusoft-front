<template>
  <div id="so2"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import requests from "../util/request.js";

let xArray = ref(["京", "沪", "黑", "吉", "辽", "鲁", "苏", "浙", "闽", "粤", "津", "鄂"])
let yArray = ref([1, 2, 5, 4, 3, 2, 5, 6, 7, 8, 9, 10])

const getOption = (data) => {
  return ref({
    // 标题
    title: {
      // 主标题
      text: 'so2浓度超标累计',
      textStyle: {
        color: '#ffffff',
        fontSize: 12,
      },
      left: 'center',
      top: '10%'
    },
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
        data: xArray.value,
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
        name: 'Count',
        type: 'bar',
        barWidth: '60%',
        data: data.value,
        itemStyle: {
          color: 'rgb(231,26,26)'
        }
      }
    ]
  })
}

const requestValue = () => {
  requests.get('/screen/so2', {})
      .then(res => {
        yArray.value = res.data
        let myChart = echarts.init(document.getElementById('so2'));
        myChart.setOption(getOption(yArray).value);
      })
}
onMounted(() => {
  requestValue()
});
</script>

<style scoped>
#so2 {
  width: 100%;
  height: 200px;
}
</style>