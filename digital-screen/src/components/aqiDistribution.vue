<template>
  <div id="aqiDistribution" style="width: 500px;height: 500px;"></div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';

let data = ref([4, 12, 4, 25, 25, 3])
let option = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
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
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

onMounted(() => {
  const chart = echarts.init(document.getElementById('aqiDistribution'));
  chart.setOption(option);
})
</script>

<style scoped>

</style>