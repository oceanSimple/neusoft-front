<template>
  <view class="container">
    <view class="empty"></view>
    <view class="title">详情提交</view>
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
    <view class="box info-input">
      <uni-easyinput style="width: 80%" v-model="data.desc" placeholder="请填写反馈信息" type="textarea"></uni-easyinput>
    </view>

    <view class="box submit">
      <button type="primary" @click="submit">提交</button>
    </view>
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
    header: {
      Authorization: 'Bearer ' + dataStore.jwt,
    },
    data: {
      aqi: data.level,
      message: data.desc,
      gridId: dataStore.gridId,
    },
    success: (res) => {
      if (res.data.code === 0) {
        uni.navigateTo({
          url: '/pages/history/index',
        })
      } else {
        uni.showToast({
          title: '禁止恶意反馈！同一用户同一地点在一天内只允许反馈一次',
          icon: 'none'
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
.container {
  background-image: url("https://i.ibb.co/k2RTsys/tuscany-5078088-1280.jpg");
  background-repeat: no-repeat;
  background-position: center center; /* 或使用预定义的关键词如 top, bottom, left, right */
  /* 其他样式（如高度）根据需要添加 */
  height: 100vh; /* 使渐变覆盖整个视口高度 */
}

.empty {
  height: 20px;
}

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
  background-color: white;
  width: 60%;
  border-radius: 20px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.box {
  margin-left: 5%;
}
.info-input {
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
}
.submit {
  margin-top: 20px;
  width: 90%;
}

.title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}
</style>