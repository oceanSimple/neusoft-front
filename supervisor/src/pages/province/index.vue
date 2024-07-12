<template>
  <uni-list>
    <view v-for="(item, index) in province" :key="index" @click="toCityPage(item)">
      <uni-list-item :title="item" showArrow></uni-list-item>
    </view>
  </uni-list>

</template>

<script setup>
import {cityData} from "../../util/airport";
import {onMounted, ref} from "vue";
import {useDataStore} from "../../stores/data";

let province = ref([])
const dataStore = useDataStore()

// 跳转到城市选择页面
const toCityPage = (province) => {
  // 将选择的province存储到dataStore中
  dataStore.selectedProvince = province
  // 跳转到城市选择页面
  uni.redirectTo({
    url: '/pages/city/index'
  })
}

onMounted(() => {
  let provinceList = []
  // 取出二维数组中，每行的第一个元素，即省份
  for (let i = 0; i < cityData.length; i++) {
    provinceList.push(cityData[i][0])
  }
  province.value = provinceList
  // 将province数组，按照首字母进行排序
  province.value.sort((a, b) => {
    return a.localeCompare(b, 'zh-CN')
  })
})
</script>

<style scoped>

</style>