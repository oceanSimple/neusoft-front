<template>
  <uni-list>
    <view v-for="(item, index) in city" :key="index" @click="toGridPage(item)">
      <uni-list-item :title="item" showArrow></uni-list-item>
    </view>
  </uni-list>
</template>

<script setup>
import {cityData} from "../../util/airport";
import {onMounted, ref} from "vue";
import {useDataStore} from "../../stores/data";
const dataStore = useDataStore()
let city = ref([])

const toGridPage = (city) => {
  dataStore.selectedCity = city
  uni.redirectTo({
    url: '/pages/grid/index'
  })
}

onMounted(() => {
  let cityList = []
  for (let i = 0; i < cityData.length; i++) {
    if (cityData[i][0] === dataStore.selectedProvince) {
      // 取出省份对应的城市列表
      cityList = cityData[i].slice(1)
      break
    }
  }
  city.value = cityList
  // 将city数组，按照首字母进行排序
  city.value.sort((a, b) => {
    return a.localeCompare(b, 'zh-CN')
  })
})
</script>

<style scoped>

</style>