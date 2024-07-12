<template>
  <div class="container">
    <div style="height: 10px"></div>
    <div class="card-back">
      <span class="title">登录</span>
      <!--账号密码输入框-->
      <div class="my-input">
        <span class="input-tag">编码</span>
        <el-input v-model="account" placeholder="input your account code" style="width: 240px;margin-left: 10px;"/>
      </div>
      <div class="my-input">
        <span class="input-tag">密码</span>
        <el-input v-model="password" placeholder="input your password" style="width: 240px;margin-left: 10px"/>
      </div>
      <!--登录按钮-->
      <div class="login-button">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
    <!--  <el-card class="card">-->
    <!--    <template #header>-->
    <!--      <div class="card-header">-->
    <!--        <span>登录</span>-->
    <!--      </div>-->
    <!--    </template>-->

    <!--    &lt;!&ndash;账号密码输入框&ndash;&gt;-->
    <!--    <div class="my-input">-->
    <!--      <span>编码</span>-->
    <!--      <el-input v-model="account" placeholder="input your account code" style="width: 240px;margin-left: 10px;"/>-->
    <!--    </div>-->
    <!--    <div class="my-input">-->
    <!--      <span>密码</span>-->
    <!--      <el-input v-model="password" placeholder="input your password" style="width: 240px;margin-left: 10px"/>-->
    <!--    </div>-->
    <!--    &lt;!&ndash;登录按钮&ndash;&gt;-->
    <!--    <div class="login-button">-->
    <!--      <el-button type="primary" @click="login">登录</el-button>-->
    <!--    </div>-->
    <!--  </el-card>-->
    <!--</div>-->
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useAdminStore} from "../../store/adminStore.js";

const account = ref('ocean')
const password = ref('123456')

const login = async () => {
  await useAdminStore().login(account.value, password.value)
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-image: url('https://i.ibb.co/gdx3vNK/c5340e3e880811ebb6edd017c2d2eca2.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

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
  margin-left: 0;
  margin-top: 30px;
}

.card-back {
  background-color: rgba(255, 255, 255, 0.5); /* 白色背景，50%透明度 */
  border: 1px solid #ccc; /* 灰色边框 */
  padding: 20px; /* 内边距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  width: 30%; /* 卡片宽度 */
  height: 35vh;
  /* 居中显示 */
  text-align: center; /* 文本居中 */
  margin: 10% auto 50px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  font-family: fangsong;
}

.input-tag {
  font-size: 20px;
  font-weight: bold;
  font-family: fangsong;
}
</style>