<template>
  <div id="co"></div>
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
      text: 'co浓度超标累计',
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
          color: 'rgba(127,167,245,0.8)'
        }
      }
    ]
  })
}

const requestValue = () => {
  requests.get('/screen/co', {})
      .then(res => {
        yArray.value = res.data
        let myChart = echarts.init(document.getElementById('co'));
        myChart.setOption(getOption(yArray).value);
      })
}
onMounted(() => {
  requestValue()
});
</script>

<style scoped>
#co {
  width: 100%;
  height: 200px;
}
</style>