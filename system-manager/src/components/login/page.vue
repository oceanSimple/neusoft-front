<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span>登录</span>
      </div>
    </template>

    <!--账号密码输入框-->
    <div class="my-input">
      <span>编码</span>
      <el-input v-model="account" placeholder="input your account code" style="width: 240px;margin-left: 10px;"/>
    </div>
    <div class="my-input">
      <span>密码</span>
      <el-input v-model="password" placeholder="input your password" style="width: 240px;margin-left: 10px"/>
    </div>
    <!--登录按钮-->
    <div class="login-button">
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </el-card>
</template>

<script setup>
import {ref} from "vue";
import {useAdminStore} from "../../store/adminStore.js";

const account = ref('')
const password = ref('')

const login = async () => {
  await useAdminStore().login(account.value, password.value)
}
</script>

<style scoped>
.card {
  max-width: 50%;
  margin-left: 25%;
  margin-top: 10%;
}

.my-input {
  margin-left: 20px;
  margin-top: 20px;
}

.login-button {
  margin-left: 150px;
  margin-top: 20px;
}
</style>