<template>
  <div id="map" style="width: 600px; height: 600px"></div>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts';
import chinaMapData from '../../public/china-map-data'

onMounted(() => {
  let myChart = echarts.init(document.getElementById("map"));
  echarts.registerMap('china', chinaMapData);
  let option = {
    series: [
      {
        type: "map",
        map: 'china', // 引入地图数据
      },
    ],
  };
  myChart.setOption(option);
})
</script>

<style scoped>

</style>