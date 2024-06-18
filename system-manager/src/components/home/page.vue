<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <div>
          <Phone class="icon-phone"/>
          <span class="title-header">东软环保公众监督平台管理系统</span>
        </div>
        <div>
          <span class="title-adminName">系统管理员：{{ adminStore.nickname }}</span>
          <el-button size="small" type="danger" @click="loginOut">OUT</el-button>
        </div>
      </el-header>

      <el-container style="height: 600px">
        <el-aside style="width: 200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  active-text-color="blue"
                  background-color="#0ec9f7"
                  class="el-menu-vertical-demo"
                  default-active="1-1"
                  default-openeds=[1,2]
                  text-color="white"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon @click="goTo('/home/default')">
                      <ChatDotRound/>
                    </el-icon>
                    <span @click="goTo('/home/default')">公众监督数据管理</span>
                  </template>
                  <el-menu-item index="1-1" @click="goTo('/home/publicSupervision')">公众监督数据列表</el-menu-item>
                  <el-menu-item index="1-2" @click="goTo('/home/confirmAQI')">确认AQI数据列表</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="2">
                  <template #title>
                    <el-icon @click="goTo('/home/default')">
                      <DocumentCopy/>
                    </el-icon>
                    <span @click="goTo('/home/default')">统计数据管理</span>
                  </template>
                  <el-menu-item index="2-1" @click="goTo('/home/provincialGroup')">省分组检查统计</el-menu-item>
                  <el-menu-item index="2-2" @click="goTo('/home/AqiDistribution')">AQI指数分布统计</el-menu-item>
                  <el-menu-item index="2-3" @click="goTo('/home/AqiTrend')">AQI指数趋势统计</el-menu-item>
                  <el-menu-item index="2-4" @click="goTo('/home/otherData')">其他数据统计</el-menu-item>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>


        <el-main>
          <div>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>promotion list</el-breadcrumb-item>
              <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="main-container">
            <router-view></router-view>
          </div>

        </el-main>
      </el-container>

      <!--footer-->
      <el-footer class="footer">
        ©️版权所有 ocean team
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import {ChatDotRound, DocumentCopy, Phone} from "@element-plus/icons-vue";
import {useAdminStore} from "../../store/adminStore.js";
import router from "../../router/index.js";
import {onMounted} from "vue";
import {useDataStore} from "../../store/dataStore.js";

const adminStore = useAdminStore();
const dataStore = useDataStore();
// 退出登录
const loginOut = () => {
  // 删除jwtToken
  localStorage.removeItem('jwtToken');
  // 跳转到登录页面
  router.push('/login');
}

// 跳转到子页面
const goTo = (path) => {
  router.push(path);
}

onMounted(async () => {
  // 初始化网格list信息
  await dataStore.getGridList()
})
</script>

<style scoped>
.common-layout {
  border: 1px solid red;
}

.header {
  background-color: #409EFF;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-phone {
  width: 30px;
  height: 30px;
  color: white;
}

.title-header {
  font-size: 25px;
  margin-left: 10px;
  color: white;
}

.title-adminName {
  color: white;
  margin-right: 20px;
}

.footer {
  background-color: #409EFF;
  color: white;
  text-align: center;
  line-height: 60px;
}
</style>