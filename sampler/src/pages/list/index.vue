<template>
  <view class="container">
    <view style="height: 30px"></view>
    <uni-card v-for="(info, index) in list" :key="index">
      <view class="table-row">
        <view :style="{background: info.color}" class="table-aqi">{{ info.aqi }}</view>

        <view class="table-info">
          <view class="table-province">{{ info.province }} {{ info.city }}</view>
          <view class="table-address">{{ info.address }}</view>
          <view class="table-address">{{ info.date }}</view>
        </view>

        <view class="table-tag" @click="detect(info)">
          <uni-tag :inverted="true" text="去检测" type="primary"/>
        </view>
      </view>
    </uni-card>
  </view>
</template>

<script setup>
import {useDataStore} from "../../store/dataStore";
import {onMounted, ref} from "vue";
import {aqiLevelToColor} from "../../util/aqi";

let list = ref([])
const dataStore = useDataStore()
const getListInfo = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/sampler/list',
    method: 'GET',
    header: {
      'Authorization': 'Bearer ' + dataStore.jwt
    },
    success: (res) => {
      list.value = res.data.data
      aqiLevelToColor(list.value)
    },
  })
}

const detect = (info) => {
  // 将info存入dataStore
  dataStore.taskInfo = info
  // 跳转到detail页面
  uni.navigateTo({
    url: '/pages/detail/index'
  })
}

onMounted(() => {
  getListInfo()
})
</script>

<style scoped>
.container {
  background-image: linear-gradient(to bottom, rgb(209, 242, 255), white);
  height: 100vh;
}
.table-row {
  display: flex;
  margin-top: 5px;
  align-items: center;
}

.table-aqi {
  width: 7%;
  text-align: center;
  color: white;
}

.table-info {
  margin-left: 3%;
  width: 70%;
}

.table-province {
  font-weight: bold;
  font-size: 18px;
}

.table-address {
  font-size: 13px;
  color: #666;
}

.table-tag {
  margin-left: 3%;
}
</style>