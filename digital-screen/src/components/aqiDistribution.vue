<template>
  <div id="aqiDistribution" style="width: 100%;height: 200px;"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';
import requests from "../util/request.js";

let data = ref([4, 12, 4, 25, 25, 3])

const getOption = (data) => {
  return {
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

    // 提示框组件。
    tooltip: {
      show: true,
      trigger: 'item'
    },
    // 图例
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'bottom',
      // 文字样式
      textStyle: {
        color: '#ffffff',
        fontSize: 10
      }
    },
    series: [
      {
        name: '等级分布',
        center: ['55%', '50%'],
        type: 'pie',
        radius: '50%',
        label: {
          fontSize: 10,
          fontFamily: 'Microsoft YaHei',
          color: '#ffffff',
        },
        data: [
          {value: data.value[0], name: '优'},
          {value: data.value[1], name: '良'},
          {value: data.value[2], name: '轻度'},
          {value: data.value[3], name: '中度'},
          {value: data.value[4], name: '重度'},
          {value: data.value[5], name: '严重'},
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 5,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}


const requestValue = async () => {
  await requests.get('/screen/aqi1', {})
      .then(res => {
        const chart = echarts.init(document.getElementById('aqiDistribution'));
        data.value = res.data
        chart.setOption(getOption(data));
      })
}

onMounted(() => {
  requestValue()
})
</script>

<style scoped>

</style>