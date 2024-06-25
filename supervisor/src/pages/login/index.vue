<template>
  <view class="content">
    <view>code: {{ code }}</view>
    <view>password: {{ password }}</view>
    <view class="container card">
      <uni-easyinput v-model="code" class="inputs" placeholder="输入手机号" prefixIcon="person"></uni-easyinput>
      <uni-easyinput v-model="password" class="inputs" placeholder="输入登录密码" prefixIcon="locked"
                     type="password"></uni-easyinput>
      <view class="register" @click="toRegister">注册</view>
      <button class="login-button" type="default" @click="login">登录</button>
    </view>
  </view>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useDataStore} from '../../stores/data';

const dataStore = useDataStore();
const code = ref('');
const password = ref('');

const toRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index',
  })
}

const login = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/supervisor/login',
    method: 'POST',
    data: {
      phoneNumber: code.value,
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
        // TODO 跳转到首页
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
  margin-left: 5%;
  width: 80%;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
