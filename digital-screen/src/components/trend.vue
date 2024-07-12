<template>
  <div id="trend"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import requests from "../util/request.js";
// 获取当前月份
let month = new Date().getMonth() + 1;
let xArray = []
for (let i = 11; i >= 0; i--) {
  let temp = month - i;
  if (temp <= 0) {
    temp += 12;
  }
  xArray.push(temp);
}
let option = ref({
  // 标题
  title: {
    // 主标题
    text: '空气质量指数级别分布',
    textStyle: {
      color: '#ffffff',
      fontSize: 12,
    },
    // 副标题
    // subtext: 'Fake Data',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: xArray
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [10, 20, 20, 60, 20, 60, 70, 80, 90, 100, 90, 80],
      type: 'line',
      smooth: true
    }
  ]
})

const requestValue = async () => {
  requests.get('/screen/aqi2', {})
      .then(res => {
        // res.data返回的是length为12的数组
        console.log(res.data)
        option.value.series[0].data = res.data;
        let myChart = echarts.init(document.getElementById('trend'));
        myChart.setOption(option.value);
      })
}

onMounted(() => {
  requestValue();
});
</script>

<style scoped>
#trend {
  width: 100%;
  height: 250px;
}
</style>