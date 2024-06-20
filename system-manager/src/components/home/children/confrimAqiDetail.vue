<template>
  <div class="back">
    <el-button type="primary" @click="back">返回</el-button>
  </div>

  <el-descriptions border :column="1" title="公众监督数据详情">
    <el-descriptions-item label="公众监督反馈信息编号">
      {{ dataStore.aqiConfirmId }}
    </el-descriptions-item>
    <el-descriptions-item label="确认信息所在地址">
      <el-tag class="table-tag">{{ tableInfo.address.province}}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.address.city }}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.address.district }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="确认aqi等级">
      <el-tag class="table-tag">{{ tableInfo.aqiLevel.level}}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.aqiLevel.description}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="确认日期时间">
      <el-tag class="table-tag">{{ tableInfo.date.date }}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.date.time }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="网格员信息">
      <el-tag class="table-tag">{{ tableInfo.samplerInfo.name }}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.samplerInfo.phone }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="公众监督员信息">
      <el-tag class="table-tag">{{ tableInfo.supervisorInfo.name }}</el-tag>
      <el-tag class="table-tag">{{ tableInfo.supervisorInfo.phone }}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="公众监督员反馈信息描述">
      {{ tableInfo.description}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import router from "../../../router/index.js";
import {useDataStore} from "../../../store/dataStore.js";

const dataStore = useDataStore()
const tableInfo = reactive({
  id: dataStore.aqiConfirmId,
  address: {
    province: "",
    city: "",
    district: "",
  },
  aqiLevel: {
    level: "",
    description: "",
  },
  date: {
    date: "",
    time: "",
  },
  samplerInfo: {
    name: "",
    phone: "",
  },
  supervisorInfo: {
    name: "",
    phone: "",
  },
  description: "",
})
// 返回
const back = () => {
  router.push("/home/confirmAQI")
}

onMounted(async () => {
  const samplerTask = await dataStore.getSamplerData(dataStore.aqiConfirmId)
  const supervisorTask = await dataStore.getSupervisorTask(samplerTask.supervisorTaskId)
  const supervisorInfo = await dataStore.getSupervisorInfo(supervisorTask.supervisorId)
  const samplerInfo = await dataStore.getSamplerInfo(samplerTask.samplerId)
  const gridInfo = await dataStore.getGridData(supervisorTask.gridId)

  tableInfo.address.province = gridInfo.province
  tableInfo.address.city = gridInfo.city
  tableInfo.address.district = gridInfo.address

  tableInfo.aqiLevel.level = samplerTask.aqi
  tableInfo.aqiLevel.description = samplerTask.aqi

  tableInfo.date.date = samplerTask.time.split(" ")[0]
  tableInfo.date.time = samplerTask.time.split(" ")[1]

  tableInfo.samplerInfo.name = samplerInfo.name
  // TODO 有问题
  tableInfo.samplerInfo.phone = samplerInfo.code

  tableInfo.supervisorInfo.name = supervisorInfo.name
  tableInfo.supervisorInfo.phone = supervisorInfo.phoneNumber

  tableInfo.description = supervisorTask.message
})
</script>

<style scoped>
.table-tag {
  margin-right: 10px;
}

.back {
  display: flex;
  justify-content: right;
}
</style>