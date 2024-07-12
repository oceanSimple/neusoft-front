<!--ODO api修改了-->
<template>
  <div style="margin: 10px">
    <div class="back">
      <el-button type="primary" @click="back">返回</el-button>
    </div>
    <el-descriptions :column="1" border title="公众监督数据详情">
      <el-descriptions-item label="公众监督反馈信息编号">
        {{ tableInfo.id }}
      </el-descriptions-item>
      <el-descriptions-item label="确认信息所在地址">
        <el-tag class="table-tag">{{ tableInfo.address.province }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.address.city }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.address.district }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="确认aqi等级">
        <el-tag class="table-tag">{{ tableInfo.aqiLevel.level }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.aqiLevel.description }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="确认日期时间">
        <el-tag class="table-tag">{{ tableInfo.date.date }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.date.time }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="网格员信息">
        <el-tag class="table-tag">{{ tableInfo.samplerInfo.name }}</el-tag>
        <!--      <el-tag class="table-tag">{{ tableInfo.samplerInfo.phone }}</el-tag>-->
      </el-descriptions-item>
      <el-descriptions-item label="公众监督员信息">
        <el-tag class="table-tag">{{ tableInfo.supervisorInfo.name }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.supervisorInfo.phone }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="公众监督员反馈信息描述">
        {{ tableInfo.description }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import router from "../../../router/index.js";
import {useDataStore} from "../../../store/dataStore.js";

const dataStore = useDataStore()
const tableInfo = reactive({
  id: '',
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
  const data = dataStore.aqiConfirmInfo
  tableInfo.id = data.id

  tableInfo.address.province = data.province
  tableInfo.address.city = data.city
  tableInfo.address.district = data.address

  tableInfo.aqiLevel.level = data.level
  tableInfo.aqiLevel.description = data.levelDesc

  tableInfo.date.date = data.date
  tableInfo.date.time = data.time

  tableInfo.samplerInfo.name = data.sampler

  tableInfo.supervisorInfo.name = data.supervisorName
  tableInfo.supervisorInfo.phone = data.supervisorId

  tableInfo.description = data.message
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