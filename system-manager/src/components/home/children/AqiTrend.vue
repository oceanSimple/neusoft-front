<template>
  <h1>AQI指数趋势统计</h1>
  <el-table :data="record" style="width: 100%">
    <el-table-column label="id" type="index"></el-table-column>
    <el-table-column label="月份" prop="date"></el-table-column>
    <el-table-column label="AQI空气质量指数超标数量" prop="aqi"></el-table-column>
  </el-table>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, ref} from "vue";

const dataStore = useDataStore()
// table数据
let record = ref([]);
onMounted(async () => {
  let result = await dataStore.getAqiTrendData()
  if (result === undefined) {
    return
  }
  let temp = []
  for (let i = 0; i < result.length; i++) {
    let tempStr = result[i].split(':')
    temp.push({
      date: tempStr[0],
      aqi: tempStr[1]
    })
  }
  record.value = temp
})
</script>

<style scoped>

</style>