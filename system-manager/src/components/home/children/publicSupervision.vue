<template>
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

    <span>预估等级</span>
    <el-select
        v-model="levelAtr.selectedLevel"
        placeholder="~全部~"
        style="width: 150px">
      <el-option
          v-for="item in levelAtr.level"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>

    <span>反馈日期</span>
    <el-date-picker
        v-model="datePicker"
        placeholder="Pick a day"
        size="small"
        type="date"
    />

    <el-button type="danger" @click="clearParam">清空</el-button>
    <el-button type="primary" @click="query">查询</el-button>

    <el-radio-group v-model="isPointTo">
      <el-radio value='0'>未指派</el-radio>
      <el-radio value='1'>已指派</el-radio>
    </el-radio-group>
  </div>

  <div class="table">
    <el-table :data="record" style="width: 100%">
      <el-table-column label="序号" type="index"></el-table-column>
      <!--    <el-table-column label="编号" prop="id"></el-table-column>-->
      <el-table-column label="反馈者姓名" prop="name"></el-table-column>
      <el-table-column label="所在省" prop="province"></el-table-column>
      <el-table-column label="所在市" prop="city"></el-table-column>
      <el-table-column label="AQI" prop="aqi">
        <template #default="{row}">
          <div :style="{color: row.color}">{{ row.levelDesc }}({{row.level}})</div>
        </template>
      </el-table-column>
      <el-table-column label="反馈日期" prop="date"></el-table-column>
      <el-table-column label="反馈时间" prop="time"></el-table-column>
      <el-table-column align="center" class="operation-container" label="操作">
        <template #default="{row}">
          <div>
            <el-icon color="#0ec9f7" @click="pointTo(row)">
              <Tickets/>
            </el-icon>
          </div>
          <div>
            <el-icon color="red">
              <Pointer/>
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
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, reactive, ref, watch} from "vue";
import {getCities, getProvinces} from "../../../util/gridList.js";
import router from "../../../router/index.js";
import {getAqiLevelInfo} from "../../../util/aqi.js";

// 网格选择器属性
let selectAtr = reactive({
  province: [],
  selectedProvince: '',
  city: [],
  selectedCity: '',
  cityDisabled: true,
})

// 预估污染等级选择器
let levelAtr = reactive({
  level: [
    {value: 1, label: '优(一级)'},
    {value: 2, label: '良(二级)'},
    {value: 3, label: '轻度污染(三级)'},
    {value: 4, label: '中度污染(四级)'},
    {value: 5, label: '重度污染(五级)'},
    {value: 6, label: '严重污染(六级)'},
  ],
  selectedLevel: ''
})

// 反馈日期选择器
let datePicker = ref('')

// 分页组件属性
let pageAtr = reactive(
    {
      currentPage: 1,
      pageSize: 10,
      total: 100
    }
)

// 是否指派
let isPointTo = ref('0')

// table数据
let record = ref([]);

let dataStore = useDataStore();
let route = router;

// 更新表格数据
const updateTable = async () => {
  const data = await dataStore.getPublicSupervisionData(getQuery())
  // 将分页插件的数据填充
  pageAtr.total = data.total
  // 将aqi数字转换成信息
  getAqiLevelInfo(data.records)
  // record.value = convertTime(data.records)
  record.value = data.records
}

// 将原来的time属性转换为date和time两个属性
const convertTime = (record) => {
  for (let i = 0; i < record.length; i++) {
    let temp = record[i].time.split(" ")
    record[i].date = temp[0]
    record[i].time = temp[1]
  }
  return record
}

// 查询列表的参数
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
    aqi: levelAtr.selectedLevel,
    date: date,
    isArranged: parseInt(isPointTo.value)
  }
}

// 指派按钮
const pointTo = (row) => {
  route.push("/home/publicSupDetail")
  dataStore.publicSupId = row.id
}

// 监听currentPage的变化
watch(() => pageAtr.currentPage, async (newVal) => {
  await updateTable(newVal)
})

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

// 查询按钮
const query = () => {
  updateTable()
}

// 清空按钮
const clearParam = () => {
  selectAtr.selectedProvince = ''
  selectAtr.selectedCity = ''
  levelAtr.selectedLevel = ''
  datePicker.value = ''
  isPointTo.value = '0'
}

onMounted(async () => {
  // 初始化select
  selectAtr.province = getProvinces()
  // 初始化表格数据
  await updateTable()
});

</script>

<style scoped>
.operation-container {
  display: flex;
  justify-content: space-around;
}

.pagination {
  display: flex;
  justify-content: center;
}

.table {
  height: 500px;
  overflow: auto;
}
</style>