<template>
  <div style="margin:10px">
    <div class="back">
      <el-button type="primary" @click="back">返回</el-button>
    </div>
    <el-descriptions :column="1" border title="公众监督数据详情">
      <el-descriptions-item label="公众监督反馈信息编号">
        {{ dataStore.publicSupId }}
      </el-descriptions-item>
      <el-descriptions-item label="反馈者信息">
        <el-tag class="table-tag">{{ tableInfo.name }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.gender }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.birth }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="反馈者联系电话">
        {{ tableInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="反馈信息所在地址">
        <el-tag class="table-tag">{{ tableInfo.province }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.city }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.district }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="反馈信息描述">
        {{ tableInfo.description }}
      </el-descriptions-item>
      <el-descriptions-item label="预估等级">
        <el-tag class="table-tag">{{ tableInfo.level }}级</el-tag>
        <el-tag class="table-tag">{{ tableInfo.levelDescription }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="反馈日期时间">
        <el-tag class="table-tag">{{ tableInfo.date }}</el-tag>
        <el-tag class="table-tag">{{ tableInfo.time }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useDataStore} from "../../../store/dataStore.js";
import router from "../../../router/index.js";
import {getAqiLevel, getAqiLevelDesc} from "../../../util/aqi.js";

const dataStore = useDataStore();
const aqiInfo = reactive({
  level: "",
  description: "",
})
const tableInfo = reactive({
  id: dataStore.publicSupId,
  name: "",
  gender: "",
  birth: "",
  phone: "",
  province: "",
  city: "",
  district: "",
  description: "",
  level: "",
  levelDescription: "",
  date: "",
  time: "",
})

// 返回
const back = () => {
  router.push("/home/publicSupervision")
}

onMounted(async () => {
  // 获取任务信息
  const taskInfo = await dataStore.getSupervisorTask(dataStore.publicSupId)
  // 获取监督员信息
  const userInfo = await dataStore.getSupervisorInfo(taskInfo.supervisorId)
  // 获取网格信息
  const gridInfo = await dataStore.getGridData(taskInfo.gridId)

  tableInfo.name = userInfo.name
  tableInfo.gender = genderFormat(userInfo.sex)
  tableInfo.birth = userInfo.birthday
  tableInfo.phone = userInfo.phoneNumber
  tableInfo.province = gridInfo.province
  tableInfo.city = gridInfo.city
  tableInfo.district = gridInfo.address
  tableInfo.description = taskInfo.message

  tableInfo.level = getAqiLevel(taskInfo.aqi)
  tableInfo.levelDescription = getAqiLevelDesc(taskInfo.aqi)

  tableInfo.date = timeFormat(taskInfo.time).date
  tableInfo.time = timeFormat(taskInfo.time).time
})

// 数据转换工具
// time 和 date
function timeFormat(time) {
  let result = {
    date: "",
    time: ""
  }
  // 时间格式转换
  let slice = time.split(" ")
  result.date = slice[0]
  result.time = slice[1]
  return result
}

// gender
function genderFormat(gender) {
  return gender === 0 ? "女" : "男"
}
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