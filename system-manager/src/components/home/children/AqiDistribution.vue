<template>
  <h1>AQI指数分布统计</h1>
  <div>
    <el-table :data="record" style="width: 100%">
      <el-table-column align="center" width="150px" label="AQI指数等级" type="index"></el-table-column>
      <el-table-column label="AQI指数等级描述" prop="label"></el-table-column>
      <el-table-column label="AQI指数等级分布统计" prop="value"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, ref} from "vue";
import {getAqiLevelCount} from "../../../util/aqi.js";

const dataStore = useDataStore();
// table数据
let record = ref([])
onMounted(async () => {
  const result = await dataStore.getAqiDistributionData()
  linkRecord(getAqiLevelCount(result))
})
// 组装record
const linkRecord = (levels) => {
  let temp = [{label: '优', value: 0},
    {label: '良', value: 0},
    {label: '轻度污染', value: 0},
    {label: '中度污染', value: 0},
    {label: '重度污染', value: 0},
    {label: '严重污染', value: 0}]
  for (let i = 0; i < levels.length; i++) {
    temp[i].value = levels[i]
  }
  record.value = temp
}
</script>

<style scoped>

</style>