<template>
  <uni-card @click="cardClick(info)" v-for="(info,index) in tableData" :key="index">
    <view class="table-row">
      <view :style="{background: info.color}" class="table-aqi">{{ info.aqi }}</view>
      <view class="table-time">{{ info.time }}</view>
      <view class="table-province">{{ info.province }}</view>
      <view class="table-city">{{ info.city }}</view>
    </view>
  </uni-card>
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
      'Authorization': 'Beared ' + dataStore.jwt
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

onMounted(async () => {
  await getHistoryInfo()
})
</script>

<style scoped>
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
</style>