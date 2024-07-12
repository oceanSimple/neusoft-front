<template>
  <div class="mid-third">
    <!-- <div class="mm"> -->
      <div id="mapDom" ></div>
    <!-- </div> -->
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import china from '../../public/china.json';
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  setup() {
    let dataList = ref([]);


    const fetchData = async () => {
      try {
        // 发送HTTP请求到后端获取数据
        const response = await axios.get('http://localhost:8006/statistics/getstanumber/byprovinces'); //  获取省份API 
        console.log(response.data.result);

        // 拿到后端的数据并改变成所需要的数组形式
        let results = response.data.result.map(item => ({
          name: item.province_name,
          value: item.value || 0 // 如果 item.value 为空，则默认为 0
        }));

        dataList.value = results; // 更新dataList的值
        mapEcharts();             //直接渲染
      
                
      } catch (error) {
        console.error('Failed to fetch map data:', error);
      }
    };







    const mapEcharts = () => {
      let initMap = echarts.init(document.querySelector('#mapDom'));
      echarts.registerMap('china', china);
      let options = {
        title: {
          // text: 'xxxx地图',
          sublink:
            'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (反馈数量)',
          textStyle: {
          fontSize: 25 // 设置字体大小
          }
        },
        toolbox: {
          show: false,
          orient: 'horizontal',
          // left: 'right',
          // top: 'center',
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          },
          bottom: 50, 
          right: 60
        },
        visualMap: {
          min: 0,
          max: 5,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          },
          left:250,
          bottom:300
        },
        series: [
          {
            name: '中国',
            type: 'map',
            map: 'china',
            label: {
              show: true,  
              fontSize: '20px'
            },
            data: dataList.value
          }
        ]
      };
      initMap.setOption(options);
    };

    onMounted(() => {
      fetchData(); 
      
      nextTick(() => {
        mapEcharts();
      });
    });

    return {};
  }
};
</script>

<style scoped>
.mid-third {
  position: fixed;
  left: 29.5%;
  width: 41%;
  height: 93.3%;
  bottom: 0%;
  background-color: #001432;
  padding: 20px;
  box-sizing: border-box;
  z-index: 1000;
}

#mapDom{
  width: 1500px;
  height: 1500px;
  top: 0%;
  right: 16%;

}
</style>