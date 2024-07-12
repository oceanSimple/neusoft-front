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
    visualMap: [
      {
        type: 'piecewise',
        show: true,
        left: 'left',
        top: 'bottom',
        itemGap: 15,
        itemWidth: 24,
        padding: 0,
        itemHeight: 16,
        seriesIndex: [0],
        pieces: [
          {gt: 199, label: '> 199', color: '#ad0c11'},
          {gt: 100, lte: 199, label: '100-199', color: 'rgba(33,151,255,0.6)'}, // 不指定 max，表示 max 为无限大（Infinity）。
          {gte: 1, lte: 100, label: '1-100', color: 'rgba(33,151,255,0.3)'},
          {value: 0, label: '0', color: '#F2F3F5', opacity: 0},
        ],
        textStyle: {
          color: '#646A73',
          fontSize: 14
        }
      }
    ],
    series: [
      {
        type: "map",
        map: 'china', // 引入地图数据
        mapType: 'china',
        name: 'AQI统计',
        label: {
          show: true,
          color: '#000',
          fontSize: 5,
        },

        data: [
          {
            name: '河北省',
            selected: false,
            value: 10
          },
          {
            name: '湖北省',
            selected: false,
            value: 220
          },
          {
            name: '内蒙古自治区',
            selected: false,
            value: 300
          }
        ],
      },
    ],
    tooltip: {
      trigger: "item",
    },
  };
  myChart.setOption(option);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
})
</script>

<style scoped>

</style>