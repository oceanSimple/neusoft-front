<template>
  <view>
    <view class="container card">
      <uni-forms>
        <uni-forms-item label="所在省">
          <uni-data-select
              v-model="data.province"
              :localdata="selectData.province"
              @change="provinceChange"
          ></uni-data-select>
        </uni-forms-item>

        <uni-forms-item label="所在市">
          <uni-data-select
              v-model="data.city"
              :localdata="selectData.city"
              @change="provinceChange"
          ></uni-data-select>
        </uni-forms-item>

        <uni-forms-item label="地址">
          <uni-easyinput v-model="data.district" placeholder="请输入地址"></uni-easyinput>
        </uni-forms-item>

        <button type="primary" @click="commit">提交</button>
      </uni-forms>
    </view>
  </view>
</template>

<script setup>
import {useDataStore} from "../../stores/data";
import {onMounted, reactive, ref, watch} from "vue";
import {getCity, getProvince} from "../../util/grid";

const dataStore = useDataStore()
const data = reactive({
  province: '',
  city: '',
  district: '',
  longitude: 0,
  latitude: 0,
})
const selectData = reactive({
  province: [],
  city: [],
  district: [],
})
let gridInfo = ref([])

// 监听grid信息变化，同时更新selectData.province
watch(gridInfo, (newVal, oldVal) => {
  selectData.province = getProvince(newVal)
  // console.log('after update selectData.province', selectData.province)
})

// 监听省选择器的变化，自适应更新市选择器
const provinceChange = () => {
  selectData.city = getCity(data.province, gridInfo.value)
}

// 获取grid信息
const getGridData = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/admin/getGridList',
    success: (res) => {
      dataStore.grid = res.data.data
      gridInfo.value = res.data.data
      // selectData.province = getProvince(dataStore.grid)
    }
  });
}

const commit = async () => {
  // 提交
  uni.request({
    url: dataStore.requestPrefix + '/supervisor/grid',
    method: 'POST',
    data: {
      province: data.province,
      city: data.city,
      address: data.district,
      x: data.longitude,
      y: data.latitude,
    },
    success: (res) => {
      if (res.data.code > 0) {
        // 从data.data中拿到gridId
        dataStore.gridId = res.data.data
        uni.navigateTo({
          url: '/pages/aqi/index',
        })
      } else {
        uni.showToast({
          title: res.data.msg,
          icon: 'none',
        })
      }
    }
  })
}

onMounted(async () => {
  await getGridData()
  // 获取经纬度
  await uni.getLocation({
    type: 'wgs84',
    success: function (res) {
      data.longitude = res.longitude
      data.latitude = res.latitude
    },
    fail: function (e) {
      console.log(e);
    }
  });
})
</script>

<style scoped>
.container {
}

.card {
  margin-left: 5%;
  width: 70%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>