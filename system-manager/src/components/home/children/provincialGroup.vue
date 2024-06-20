<template>
  <h1>省分组检查统计</h1>
  <div>
    <el-table :data="record" style="width: 100%">
      <el-table-column label="id" type="index"></el-table-column>
      <el-table-column label="省名称" prop="province"></el-table-column>
      <el-table-column label="SO2超标累计" prop="so2Count"></el-table-column>
      <el-table-column label="CO超标累计" prop="cocount"></el-table-column>
      <el-table-column label="PM2.5超标累计" prop="pm25Count"></el-table-column>
      <el-table-column label="AQI超标累计" prop="aqicount"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, ref} from "vue";

const dataStore = useDataStore();
// table数据
let record = ref([]);

onMounted(async () => {
  record.value = await dataStore.getProvinceData()
});
</script>

<style scoped>

</style>