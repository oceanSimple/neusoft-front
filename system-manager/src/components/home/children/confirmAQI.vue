<template>
  <div class="main">
    <div class="head">
      <span>省区域</span>
      <el-select
          v-model="selectAtr.selectedProvince"
          placeholder="~全部~"
          style="width: 100px">
        <el-option
            v-for="item in selectAtr.province"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>

      <span>市区域</span>
      <el-select
          v-model="selectAtr.selectedCity"
          :disabled="selectAtr.cityDisabled"
          placeholder="~全部~"
          style="width: 100px">
        <el-option
            v-for="item in selectAtr.city"
            :key="item"
            :label="item"
            :value="item"
        />
      </el-select>

      <span>反馈日期</span>
      <el-date-picker
          v-model="datePicker"
          placeholder="Pick a day"
          size="small"
          type="date"
      />

      <el-button style="margin-left: 5px;" type="danger" @click="clearParam">清空</el-button>
      <el-button type="primary" @click="query">查询</el-button>
    </div>

    <div class="table">
      <el-table :data="record" style="width: 100%">
        <el-table-column label="id" type="index"></el-table-column>
        <!--    <el-table-column label="编号" prop="id"></el-table-column>-->
        <el-table-column label="所在省" prop="province"></el-table-column>
        <el-table-column label="所在市" prop="city"></el-table-column>
        <el-table-column label="AQI" prop="aqi">
          <template #default="{row}">
            <div :style="{color: row.color}">{{ row.levelDesc }}({{ row.level }})</div>
          </template>
        </el-table-column>
        <el-table-column label="确认日期" prop="date"></el-table-column>
        <el-table-column label="确认时间" prop="time"></el-table-column>
        <el-table-column label="网格员" prop="sampler"></el-table-column>
        <el-table-column label="反馈者" prop="supervisorName"></el-table-column>
        <el-table-column align="center" class="operation-container" label="操作">
          <template #default="{row}">
            <div>
              <el-icon color="#0ec9f7" @click="pointTo(row)">
                <Tickets/>
              </el-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页组件-->
    <div class="pagination">
      <el-pagination
          v-model:current-page="pageAtr.currentPage"
          :total="pageAtr.total"
          layout="prev, pager, next"/>
    </div>
  </div>

</template>

<script setup>
// 网格选择器属性
import {onMounted, reactive, ref, watch} from "vue";
import {getCities, getProvinces} from "../../../util/gridList.js";
import {useDataStore} from "../../../store/dataStore.js";
import router from "../../../router/index.js";
import {getAqiLevelInfo} from "../../../util/aqi.js";

const dataStore = useDataStore()
let selectAtr = reactive({
  province: [],
  selectedProvince: '',
  city: [],
  selectedCity: '',
  cityDisabled: true,
})
// 反馈日期选择器
let datePicker = ref('')

// 监听selectAtr.selectedProvince的变化
watch(() => selectAtr.selectedProvince, (newVal) => {
  if (newVal === '') {
    selectAtr.cityDisabled = true
  } else {
    // 清空city
    selectAtr.selectedCity = ''
    selectAtr.city = getCities(newVal)
    selectAtr.cityDisabled = false
  }
})

// 清空按钮
const clearParam = () => {
  selectAtr.selectedProvince = ''
  selectAtr.selectedCity = ''
  datePicker.value = ''
}

// 分页组件属性
let pageAtr = reactive(
    {
      currentPage: 1,
      pageSize: 10,
      total: 100
    }
)

let record = ref([])

const getQuery = () => {
  // 日期选择器的组件返回的是time对象，因此需要通过time对象拼接成YYYY-MM-DD格式
  let date;
  if (datePicker.value === '') {
    date = ''
  } else {
    date = datePicker.value.getFullYear() + '-' +
        (datePicker.value.getMonth() + 1).toString().padStart(2, '0') + '-' +
        datePicker.value.getDate().toString().padStart(2, '0');
  }
  return {
    index: pageAtr.currentPage,
    province: selectAtr.selectedProvince,
    city: selectAtr.selectedCity,
    date: date,
  }
}

const updateTable = async () => {
  const data = await dataStore.getAqiConfirmData(getQuery())
  // 将aqi数字转换成信息
  getAqiLevelInfo(data.records)
  record.value = data.records
  pageAtr.total = data.total
}

const query = async () => {
  await updateTable()
}

const pointTo = (row) => {
  router.push("/home/confirmAqiDetail")
  dataStore.aqiConfirmInfo = row
  console.log(dataStore.aqiConfirmInfo)
}

// 监听currentPage的变化
watch(() => pageAtr.currentPage, async (newVal) => {
  await updateTable(newVal)
})

onMounted(async () => {
  // 初始化select
  selectAtr.province = getProvinces()
  // 初始化表格
  await updateTable()
});
</script>

<style scoped>
.head > span {
  margin-left: 5px;
  margin-right: 5px;
}

.main {
  margin: 10px;
}

.table {
  width: 100%;
  height: 75vh;
  overflow: auto;
}

.pagination {
  display: flex;
  justify-content: center;
}
</style>