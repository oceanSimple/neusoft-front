<template>
  <div class="container">
    <div>全国大城市网格覆盖率(%)</div>
    <div id="city" style="width: 300px;height: 300px"></div>
  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import * as echarts from 'echarts';

let value = ref(45);
let option = {
  series: [
    {
      type: 'gauge',
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 40,
        fontSize: 15
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        color: 'inherit',
        fontSize: 20
      },
      data: [
        {
          value: value.value,
        }
      ]
    }
  ]
};

onMounted(() => {
  let myChart = echarts.init(document.getElementById('city'));
  myChart.setOption(option);
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