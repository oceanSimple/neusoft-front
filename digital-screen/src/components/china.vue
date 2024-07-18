<template>
  <div id="map" style="width: 100%; height: 95vh"></div>
</template>

<script setup>
import {onMounted} from "vue";
import * as echarts from 'echarts';
import chinaMapData from '../../public/china-map-data'
import requests from "../util/request.js";
import {dealMapRequest} from "../util/mapTool.js";

const requestValue = async () => {
  await requests.get('/screen/statistics', {})
      .then(res => {
        let data = dealMapRequest(res.data)

        let myChart = echarts.init(document.getElementById("map"));
        echarts.registerMap('china', chinaMapData);
        let option = {
          // 标题
          title: {
            // 主标题
            text: '空气质量检查实时统计',
            textStyle: {
              color: '#ffffff',
              fontSize: 20,
            },
            left: 'center',
            bottom: '10%'
          },
          visualMap: [
            {
              type: 'piecewise',
              show: true,
              left: '20',

              bottom: '30',
              itemGap: 15,
              itemWidth: 24,
              padding: 0,
              itemHeight: 16,
              seriesIndex: [0],
              pieces: [
                {min: 5, label: '> 6',},
                {min: 4, max: 5, label: '4-5', }, // 不指定 max，表示 max 为无限大（Infinity）。
                {min: 1, max: 3, label: '1-3', },
                {value: 0, label: '0',  opacity: 0},
              ],
              inRange: {
                color: ['#fcfcfc', 'rgb(240,25,25)'],
                symbolSize: [30, 100],
                opacity: 1
              },
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
                fontSize: 7,
              },

              data: data,
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
}
onMounted(() => {

  requestValue()
})
</script>

<style scoped>

</style>