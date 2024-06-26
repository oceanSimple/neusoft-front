<template>
  <!--  任务详情-->
  <uni-card>
    <view class="info-row">
      <view class="info-tag">反馈用户</view>
      <view class="info-detail">{{ taskInfo.name }} {{taskInfo.phoneNumber}}</view>
    </view>

    <view class="info-row">
      <view class="info-tag">网格</view>
      <view class="info-detail">{{ taskInfo.province }} {{ taskInfo.city }}</view>
    </view>

    <view class="info-row">
      <view class="info-tag">详细地址</view>
      <view class="info-detail">{{ taskInfo.address }}</view>
    </view>

    <view class="info-row">
      <view class="info-tag">预估等级</view>
      <view class="info-detail">{{ taskInfo.level }} {{ taskInfo.desc }}</view>
    </view>

    <view class="info-row">
      <view class="info-tag">信息描述</view>
      <view class="info-detail">{{ taskInfo.message }}</view>
    </view>
  </uni-card>
</template>

<script setup>
import {useDataStore} from "../../store/dataStore";
import {onMounted, reactive} from "vue";
import {aqiLevelToDesc} from "../../util/aqi";

const dataStore = useDataStore();
let taskInfo = reactive(dataStore.taskInfo);
onMounted(() => {
  aqiLevelToDesc(taskInfo);
});
</script>

<style scoped>
.info-row {
  display: flex;
  margin-top: 5px;
}

.info-tag {
  font-weight: bold;
  font-size: 15px;
  width: 20%;
  text-align: center;
}

.info-detail {
  font-size: 15px;
  margin-left: 10px;
  color: #666;
}
</style>