<template>
  <view class="table">
    <uni-card>
      <view v-for="(info, index) in aqiInfo" :key="info.level" class="table-row">
        <view class="info-label">{{ info.label }}({{ info.level }})</view>
        <view class="info-desc">{{ info.desc }}</view>
      </view>
    </uni-card>
  </view>

  <view class="box">
    <view class="tip">请预估当前空气质量指数等级：</view>
  </view>
  <view class="box">
    <uni-data-checkbox v-model="data.level" :localdata="radioInfo"></uni-data-checkbox>
  </view>

  <view class="box">
    <view class="tip">请填写反馈信息：</view>
  </view>
  <view class="box">
    <uni-easyinput v-model="data.desc" placeholder="请填写反馈信息" type="textarea"></uni-easyinput>
  </view>

  <view class="box">
    <button type="primary" @click="submit">提交</button>
  </view>
</template>

<script setup>
import {aqiInfo} from "../../util/aqiDesc";
import {onMounted, reactive, ref} from "vue";
import {useDataStore} from "../../stores/data";

const aqiInfos = aqiInfo

const data = reactive({
  level: '',
  desc: '',
})

const radioInfo = ref([])
const convertAqiInfoToRadioInfo = () => {
  aqiInfos.forEach(info => {
    radioInfo.value.push({
      text: info.level,
      value: info.level,
    })
  })
}
const dataStore = useDataStore()
const submit = () => {
  uni.request({
    url: dataStore.requestPrefix + '/supervisor/task',
    method: 'POST',
    data: {
      aqi: data.level,
      message: data.desc,
      gridId: dataStore.gridId,
    },
    success: (res) => {
      if (res.data.code > 0) {
        uni.navigateTo({
          url: '/pages/history/index',
        })
      }
    },
  })
}

onMounted(() => {
  convertAqiInfoToRadioInfo()
})
</script>

<style scoped>
.table-row {
  display: flex;
  margin-top: 10px;
}

.info-label {
  width: 25%;
  text-align: center;
}

.info-desc {
  width: 75%;
}

.tip {
  font-size: 16px;
  font-weight: bold;
}

.box {
  margin-left: 5%;
}
</style>