<template>
  <div class="container">
    <!--头部-->
    <div class="header">
      <div class="header-title">东软空气质量环保公众监督平台</div>
      <div class="header-time">{{ new Date().toISOString().split('T')[0] }}&nbsp;&nbsp;{{ timeTicker }}</div>
    </div>

    <!--核心部分-->
    <div class="main">
      <div class="main-left">
        <!--仪表盘-->
        <div class="gauge">
          <div class="gauge-left">
            <div class="gauge-title">全国省会城市网格覆盖率(%)</div>
            <province-coverage></province-coverage>
          </div>
          <div class="gauge-left">
            <div class="gauge-title">全国大城市网格覆盖率(%)</div>
            <city-coverage></city-coverage>
          </div>
        </div>

        <!--饼图-->
        <div class="pie">
          <aqi-distribution></aqi-distribution>
        </div>

        <!--曲线图-->
        <div>
          <trend></trend>
        </div>
      </div>

      <div class="main-center">
        <div class="china">
          <china></china>
        </div>
      </div>

      <div class="main-right">
        <pm25></pm25>
        <so2></so2>
        <co></co>
      </div>
    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import ProvinceCoverage from "./provinceCoverage.vue";
import CityCoverage from "./cityCoverage.vue";
import AqiDistribution from "./aqiDistribution.vue";
import Trend from "./trend.vue";
import Pm25 from "./pm25.vue";
import So2 from "./so2.vue";
import Co from "./co.vue";
import China from "./china.vue";

const timeTicker = ref(new Date().toLocaleTimeString());
let timer

onMounted(() => {
  timer = setInterval(() => {
    timeTicker.value = new Date().toLocaleTimeString()
  }, 1000)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 600px;
  overflow: hidden;
  position: relative;
  font-family: "Microsoft Yahei", Arial, sans-serif;
  background: rgb(40, 30, 47) url("../assets/bg.png") 0 0 / 100% 100% no-repeat;
}

.header {
  position: relative;
  height: 40px;
  background: url("../assets/header.png") 0 0 / 100% 100% no-repeat;
  overflow: hidden;
}

.header-title {
  line-height: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #fff;
}

.header-time {
  position: absolute;
  top: 10px;
  font-size: 15px;
  color: #73aae5;
  right: 20px;
}

.main {
  display: flex;
  height: 95vh
}

.main-left, .main-right {
  width: 25%;

}

.main-center {
  width: 50%;

}

.gauge {
  display: flex;
  margin-top: 20px;
}

.gauge-left, .gauge-right {
  width: 50%;
}

.gauge-title {
  color: white;
  font-size: 10px;
  text-align: center;
}

.pie {
  margin-top: 10px;
  margin-bottom: 10px;
}

.china {

}
</style>
