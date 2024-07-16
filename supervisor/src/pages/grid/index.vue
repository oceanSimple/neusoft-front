<template>
  <view class="container">
    <view class="empty"></view>
    <uni-forms>
      <view class="card">
        <view class="form-title">选择网格</view>
        <uni-forms-item label="所在省">
          <view class="select-tag" @click="toSelectProvincePage">{{ dataStore.selectedProvince }}</view>
        </uni-forms-item>

        <uni-forms-item label="所在市">
          <view class="select-tag" @click="toSelectCityPage">{{ dataStore.selectedCity }}</view>
        </uni-forms-item>

        <uni-forms-item label="地址">
          <uni-easyinput v-model="data.district" placeholder="请输入地址"></uni-easyinput>
        </uni-forms-item>

        <button type="primary" @click="commitGrid">提交</button>
      </view>
    </uni-forms>
  </view>
</template>

<script setup>
import {useDataStore} from "../../stores/data";
import {onMounted, reactive, ref, watch} from "vue";
import {getProvinces} from "../../util/gridFunc";

const dataStore = useDataStore()
const province = ref('')
const data = reactive({
  province: '',
  city: '',
  district: '',
  longitude: 0,
  latitude: 0,
})
const cityData = reactive({
  province: [],
  city: [],
})

watch(dataStore, (newVal, oldVal) => {
  //console.log('province change', newVal)
})

const toSelectProvincePage = () => {
  uni.navigateTo({
    url: '/pages/province/index',
  })
}

const toSelectCityPage = () => {
  uni.navigateTo({
    url: '/pages/city/index',
  })
}

const commitGrid = async () => {
  // 提交
  await uni.request({
    url: dataStore.requestPrefix + '/supervisor/grid',
    method: 'POST',
    header: {
      Authorization: 'Bearer ' + dataStore.jwt,
    },
    data: {
      province: dataStore.selectedProvince,
      city: dataStore.selectedCity,
      address: data.district,
      x: data.longitude * 1000000,
      y: data.latitude * 1000000,
    },
    success: (res) => {
      if (res.data.code === 0) {
        // 从data.data中拿到gridId
        dataStore.gridId = res.data.data
        uni.navigateTo({
          url: '/pages/aqi/index',
        })
      } else {
        uni.showToast({
          title: '网格提交失败',
          icon: 'none',
        })
      }
    }
  })
}

onMounted(async () => {
  // await getGridData()
  cityData.province = getProvinces()
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
  background-image: url("https://i.ibb.co/k2RTsys/tuscany-5078088-1280.jpg");
  background-repeat: no-repeat;
  background-position: center center; /* 或使用预定义的关键词如 top, bottom, left, right */
  height: 800px;
}

.empty {
  height: 150px;
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.card {
  margin-left: 8%;
  width: 70%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.select-tag {
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  color: #666;
  font-size: 12px;
}
</style>