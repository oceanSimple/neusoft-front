<template>
  <div id="province"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import requests from "../util/request.js";

let value = ref(20);

let option = ref({
  series: [
    {
      type: 'gauge',
      // 偏离中心位置
      center: ['50%', '50%'],
      // 进度条(即70/100中，70的部分)
      progress: {
        show: true,
        width: 5,
        itemStyle: {
          color: '#63f807'
        }
      },
      // 分割线样式(width一般与progress一致)
      // 即70/100中，100的部分
      axisLine: {
        lineStyle: {
          width: 5,
        }
      },
      // 表盘刻度
      axisTick: {
        show: false
      },
      // 刻度标签
      axisLabel: {
        distance: 5,
        color: '#ffffff',
        fontSize: 8
      },
      // 分割线(没啥用)
      splitLine: {
        length: 0,
        lineStyle: {
          width: 10,
          color: '#f80202'
        }
      },
      // 表盘中指针的固定点。
      // 即指针尾部中心的小圆点
      anchor: {
        show: true,
        showAbove: true,
        size: 5,
        itemStyle: {
          borderWidth: 10
        }
      },
      title: {
        show: true
      },
      detail: {
        valueAnimation: true,
        fontSize: 10,
        offsetCenter: [0, '70%'],
        color: '#63f807'
      },
      data: [
        {
          value: value.value,
        }
      ]
    }
  ]
});

const requestValue = async () => {
  await requests.get('/screen/capital', {})
      .then(res => {
        // 后台传来的格式是25.1%
        // 去掉百分号，并转为数字
        value.value = parseFloat(res.data.replace('%', ''))
        option.value.series[0].data[0].value = value.value
        let myChart = echarts.init(document.getElementById('province'));
        myChart.setOption(option.value);
      })
}

onMounted(async () => {
  await requestValue()
});
</script>

<style scoped>
#province {
  width: 100%;
  height: 120px;
}
</style>