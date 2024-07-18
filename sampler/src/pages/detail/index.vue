<template>
  <view class="container">
    <view style="height: 20px"></view>
    <view class="title">数据检测提交</view>
    <!--  任务详情-->
    <uni-card>
      <view class="info-row">
        <view class="info-tag">反馈用户</view>
        <view class="info-detail">{{ taskInfo.name }} {{ taskInfo.phoneNumber }}</view>
      </view>

      <view class="info-row">
        <view class="info-tag">网格</view>
        <view class="info-detail">{{ taskInfo.province }} {{ taskInfo.city }}</view>
      </view>

      <view class="info-row">
        <view class="info-tag">详细地址</view>
        <view class="info-detail">{{ taskInfo.address }}</view>
      </view>

      <view class="info-row">
        <view class="info-tag">预估等级</view>
        <view class="info-detail">{{ taskInfo.level }} {{ taskInfo.desc }}</view>
      </view>

      <view class="info-row">
        <view class="info-tag">信息描述</view>
        <view class="info-detail">{{ taskInfo.message }}</view>
      </view>
    </uni-card>
    <!--数据部分-->
    <uni-card>
      <view class="data">
        <view class="data-title">SO2浓度</view>
        <uni-easyinput v-model="data.so2" class="data-input" focus placeholder="请输入SO2浓度"></uni-easyinput>
        <view class="data-tag">ug/m3</view>
      </view>
      <view class="data">
        <view class="data-title">CO浓度</view>
        <uni-easyinput v-model="data.co" class="data-input" focus placeholder="请输入CO浓度"></uni-easyinput>
        <view class="data-tag">ug/m3</view>
      </view>
      <view class="data">
        <view class="data-title">PM2.5浓度</view>
        <uni-easyinput v-model="data.pm25" class="data-input" focus placeholder="请输入PM2.5浓度"></uni-easyinput>
        <view class="data-tag">ug/m3</view>
      </view>

      <view class="data-view" style="margin-top: 20px;">实测AQI值：{{ aqiNum }}</view>
      <view class="data-view">实测AQI等级：{{ aqiInfo.level }} {{ aqiInfo.desc }}</view>

      <view class="button" @click="submit">提交</view>
    </uni-card>
  </view>

</template>

<script setup>
import {useDataStore} from "../../store/dataStore";
import {onMounted, reactive, ref, watch} from "vue";
import {aqiLevelToDesc} from "../../util/aqi";
import {getAQIByParam, getAQILevel} from "../../util/calculate";

const dataStore = useDataStore();
let taskInfo = reactive(dataStore.taskInfo);
const data = reactive({
  so2: 0,
  co: 0,
  pm25: 0,
})
const aqiNum = ref(0)
const aqiLevel = ref(0)
const aqiInfo = reactive({
  level: 0,
  desc: '',
  number: 0,
})
watch(() => data.so2, (newVal) => {
  aqiNum.value = getAQIByParam(data.so2, data.co, data.pm25)
  aqiLevel.value = getAQILevel(aqiNum.value)
  aqiInfoFunc()
})
watch(() => data.co, (newVal) => {
  aqiNum.value = getAQIByParam(data.so2, data.co, data.pm25)
  aqiLevel.value = getAQILevel(aqiNum.value)
  aqiInfoFunc()
})
watch(() => data.pm25, (newVal) => {
  aqiNum.value = getAQIByParam(data.so2, data.pm25, data.co)
  aqiLevel.value = getAQILevel(aqiNum.value)
  aqiInfoFunc()
})
const aqiInfoFunc = () => {
  let item = {aqi: aqiLevel.value}
  aqiLevelToDesc(item)
  aqiInfo.level = item.level
  aqiInfo.desc = item.desc
  aqiInfo.number = item.number
}
const submit = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/sampler/task',
    method: 'POST',
    header: {
      'Authorization': 'Bearer ' + dataStore.jwt
    },
    data: {
      so2: data.so2,
      co: data.co,
      pm25: data.pm25,
      aqi: aqiInfo.number,
      gridId: taskInfo.gridId,
    },
    success: (res) => {
      if (res.data.code === 0) {
        uni.navigateTo({
          url: '/pages/list/index'
        })
        console.log('success')
      } else {
        console.log('fail')
      }
    },
  })
}

onMounted(() => {
  aqiLevelToDesc(taskInfo);
  //console.log(taskInfo)
});
</script>

<style scoped>
.container {
  background-image: linear-gradient(to bottom, rgb(209, 242, 255), white);
  height: 100vh;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  color: #ea2323;
  font-family: '华文行楷';
}

.info-row {
  display: flex;
  margin-top: 5px;
}

.info-tag {
  font-weight: bold;
  font-size: 15px;
  width: 20%;
  text-align: center;
}

.info-detail {
  font-size: 15px;
  margin-left: 10px;
  color: #666;
}

.data {
  display: flex;
  align-items: center;
  margin-left: 3%;
  margin-top: 10px;
}

.data-title {
  font-weight: bold;
  font-size: 15px;
  width: 25%;
  text-align: center;
}

.data-input {
  width: 50%;
  margin-left: 5px;
}

.data-tag {
  margin-left: 3px;
  font-weight: bold;
  font-size: 15px;
  width: 20%;
  text-align: center;
}

.data-view {
  font-weight: bold;
  font-size: 15px;
  margin-left: 3%;
  margin-top: 15px;
  color: #666;
  text-align: center;
}

.button {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: white;
  background-color: #27cfc1;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  margin-left: 3%;
  width: 94%;
  margin-bottom: 20px;
}
</style>