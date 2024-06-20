<template>
  <el-descriptions border :column="1" title="公众监督数据详情">
    <el-descriptions-item label="空气质量检测总数量">
      {{ tableInfo.count }}
    </el-descriptions-item>
    <el-descriptions-item label="空气质量检测良好数量">
      {{ tableInfo.goodCount }}
    </el-descriptions-item>
    <el-descriptions-item label="省会城市网格覆盖范围">
      {{ tableInfo.provinceGrid}}
    </el-descriptions-item>
    <el-descriptions-item label="大城市网格覆盖范围">
      {{ tableInfo.cityGrid}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, reactive} from "vue";
import {getAqiLevelCount} from "../../../util/aqi.js";

const dataStore = useDataStore();
const tableInfo = reactive({
  count: "",
  goodCount: "",
  provinceGrid: "",
  cityGrid: "",
})
onMounted(async () => {
  // 总数
  const levelData = await dataStore.getAqiDistributionData()
  tableInfo.count = levelData.length
  // 空气质量良好的数量
  const levels = getAqiLevelCount(levelData)
  tableInfo.goodCount = levels[0] + levels[1]
  // 省会城市网格覆盖范围
  tableInfo.provinceGrid = await dataStore.getProvinceCoverageData()
  // 大城市网格覆盖范围
  tableInfo.cityGrid = await dataStore.getCityCoverageData()
})
</script>

<style scoped>

</style>