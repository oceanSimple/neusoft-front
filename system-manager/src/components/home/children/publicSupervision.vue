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

    <div class="table">
      <el-table :data="record" style="width: 100%">
        <el-table-column label="序号" type="index"></el-table-column>
        <!--    <el-table-column label="编号" prop="id"></el-table-column>-->
        <el-table-column label="反馈者姓名" prop="name"></el-table-column>
        <el-table-column label="所在省" prop="province"></el-table-column>
        <el-table-column label="所在市" prop="city"></el-table-column>
        <el-table-column label="AQI" prop="aqi"></el-table-column>
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
  </div>
</template>

<script setup>
import {useDataStore} from "../../../store/dataStore.js";
import {onMounted, reactive, ref, watch} from "vue";
import {getCities, getProvinces} from "../../../util/gridList.js";

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
    {value: 1, label: '轻度污染(一级)'},
    {value: 2, label: '初级污染(二级)'},
    {value: 3, label: '中度污染(三级)'},
    {value: 4, label: '重度污染(四级)'},
    {value: 5, label: '严重污染(五级)'},
  ],
  selectedLevel: ''
})

let datePicker = ref('')

// 分页组件属性
let pageAtr = reactive(
    {
      currentPage: 3,
      pageSize: 10,
      total: 100
    }
)

let record = ref([]);
let dataStore = useDataStore();


const updateTAble = async (index) => {
  const data = await dataStore.getPublicSupervisionData(index);
  // 将分页插件的数据填充
  pageAtr.total = data.total
  record.value = convertTime(data.records)
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

// 指派按钮
const pointTo = (row) => {
  console.log(row)
}

// 监听currentPage的变化
watch(() => pageAtr.currentPage, async (newVal) => {
  await updateTAble(newVal)
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

onMounted(async () => {
  // 初始化select
  selectAtr.province = getProvinces()
  console.log(selectAtr.province)
  // 初始化表格数据
  await updateTAble(1)
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