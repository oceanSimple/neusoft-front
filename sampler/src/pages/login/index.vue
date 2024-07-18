<template>
  <view class="content">
    <view style="height: 150px"></view>
    <view class="container card">
      <view class="title">东软环保公众监督平台</view>
      <view class="title">网格员端</view>
      <uni-easyinput v-model="code" class="inputs" placeholder="输入手机号" prefixIcon="person"></uni-easyinput>
      <uni-easyinput v-model="password" class="inputs" placeholder="输入登录密码" prefixIcon="locked"
                     type="password"></uni-easyinput>
      <!--<view class="register" @click="toRegister">注册</view>-->
      <button class="login-button" type="default" @click="login">登录</button>
    </view>
  </view>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useDataStore} from '../../store/dataStore';

const dataStore = useDataStore();
const code = ref('beijixiong2');
const password = ref('123456');

const login = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/sampler/login',
    method: 'POST',
    data: {
      code: code.value,
      password: password.value
    },
    success: (res) => {
      // 根据data.code判断是否登录成功
      if (res.data.code === 0) { // 登录成功
        dataStore.jwt = res.data.data // 将jwt保存在pinia仓库
        // 将jwt存入本地存储
        uni.setStorage({
          key: 'jwt',
          data: res.data.data
        })
        uni.navigateTo({
          url: '/pages/list/index',
        })
      } else {
        uni.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    },
  })
}

onMounted(() => {
})
</script>

<style>
.content {
  background-image: url("https://i.ibb.co/k2RTsys/tuscany-5078088-1280.jpg");
  background-repeat: no-repeat;
  background-position: center center; /* 或使用预定义的关键词如 top, bottom, left, right */
  height: 800px;
}
.title {
  color: #358c5b;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
}

.inputs {
  margin-top: 20px;
}

.register {
  text-align: right;
  color: #358c5b;
  margin-top: 15px;
  font-size: 15px;
}

.login-button {
  margin-top: 20px;
  width: 80%;
  height: 50px;
  background-color: #a8bcb0;
  color: #fff;
  border-radius: 5px;

  font-size: 20px;
  font-family: '华文行楷';
}

.card {
  margin-left: 3%;
  width: 80%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
