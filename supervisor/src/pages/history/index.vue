<template>
  <view class="background-gradient">
    <view class="button">
      <uni-tag :circle="true" text="新增反馈" type="primary" @click="toGrid" />
    </view>
    <uni-card style="border-radius: 10px" v-for="(info,index) in tableData" :key="index" @click="cardClick(info)">
      <view class="table-row">
        <view :style="{background: info.color}" class="table-aqi">{{ info.aqi }}</view>
        <view class="table-time">{{ info.date }} {{ info.time }}</view>
        <view class="table-province">{{ info.province }}</view>
        <view class="table-city">{{ info.city }}</view>
      </view>
    </uni-card>
  </view>
</template>

<script setup>
import {useDataStore} from "../../stores/data";
import {onMounted, ref} from "vue";
import {aqiLevelToColor} from "../../util/aqi";

const dataStore = useDataStore()
const tableData = ref([])
const getHistoryInfo = async () => {
  uni.request({
    url: dataStore.requestPrefix + '/supervisor/list',
    method: 'GET',
    header: {
      'Authorization': 'Bearer ' + dataStore.jwt
    },
    success: (res) => {
      tableData.value.push(...res.data.data)
      aqiLevelToColor(tableData.value)
    }
  })
}

const cardClick = (info) => {
  console.log(info)
}

const toGrid = () => {
  uni.navigateTo({
    url: '/pages/grid/index',
  })
}

onMounted(async () => {
  await getHistoryInfo()
})
</script>

<style scoped>
.background-gradient {
  background-image: url("https://i.ibb.co/k2RTsys/tuscany-5078088-1280.jpg");
  background-repeat: no-repeat;
  background-position: center center; /* 或使用预定义的关键词如 top, bottom, left, right */
  /* 其他样式（如高度）根据需要添加 */

}

.table-row {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.table-aqi {
  width: 7%;
  text-align: center;
  color: white;
}

.table-time {
  width: 40%;
  margin-left: 3%;
}

.table-province {
  width: 25%;
  margin-left: 3%;
}

.table-city {
  width: 25%;
  margin-left: 3%;
}

.button {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>