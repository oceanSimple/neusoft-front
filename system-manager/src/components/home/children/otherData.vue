<template>
  <div style="margin: 10px">
    <el-descriptions :column="1" border title="公众监督数据详情">
      <el-descriptions-item label="空气质量检测总数量">
        {{ tableInfo.count }}
      </el-descriptions-item>
      <el-descriptions-item label="空气质量检测良好数量">
        {{ tableInfo.goodCount }}
      </el-descriptions-item>
      <el-descriptions-item label="省会城市网格覆盖范围">
        {{ tableInfo.provinceGrid }}
      </el-descriptions-item>
      <el-descriptions-item label="大城市网格覆盖范围">
        {{ tableInfo.cityGrid }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, reactive} from "vue";

const dataStore = useDataStore();
const tableInfo = reactive({
  count: "",
  goodCount: "",
  provinceGrid: "",
  cityGrid: "",
})
onMounted(async () => {
  // 总数
  tableInfo.count = await dataStore.getAqiTotal()
  // 空气质量良好的数量
  tableInfo.goodCount = await dataStore.getAqiGood()
  // 省会城市网格覆盖范围
  tableInfo.provinceGrid = await dataStore.getProvinceCoverageData()
  // 大城市网格覆盖范围
  tableInfo.cityGrid = await dataStore.getCityCoverageData()
})
</script>

<style scoped>

</style>