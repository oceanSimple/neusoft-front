<template>
  <view>
    <uni-card>
      <uni-forms ref="valiForm" :modelValue="valiFormData" :rules="rules">
        <uni-forms-item label="手机号码">
          <uni-easyinput v-model="valiFormData.phone" placeholder="请输入手机号码"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item label="真实姓名">
          <uni-easyinput v-model="valiFormData.name" placeholder="真实姓名便于我们联系您"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item label="年龄" name="age" required>
          <uni-easyinput v-model="valiFormData.age" placeholder="年龄"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item label="性别">
          <uni-data-checkbox v-model="valiFormData.sex" :localdata="sexs"></uni-data-checkbox>
        </uni-forms-item>

        <uni-forms-item label="密码">
          <uni-easyinput v-model="valiFormData.password" placeholder="请输入密码" type="password"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item label="确认密码">
          <uni-easyinput v-model="valiFormData.Rpassword" placeholder="确认密码" type="password"></uni-easyinput>
        </uni-forms-item>

        <button type="primary" @click="submit('valiForm')">提交</button>
      </uni-forms>
    </uni-card>
  </view>
</template>

<script setup>
import {getCurrentInstance, reactive} from "vue";
import {useDataStore} from "../../stores/data";

let instance = getCurrentInstance()
const valiFormData = reactive({
  phone: '',
  name: '',
  age: 12,
  sex: '',
  password: '',
  Rpassword: '',
})

const sexs = [{
  text: '男',
  value: 0
}, {
  text: '女',
  value: 1
}]

// 表单校验规则
const rules = {
  age: {
    rules: [{
      required: true,
      errorMessage: '年龄不能为空'
    }, {
      format: 'number',
      errorMessage: '年龄必须为数字'
    }]
  },
}

// 提交按钮
const submit = async (ref) => {
  // 首先自动校验
  instance.proxy.$refs[ref].validate().then(async (res) => {
    // 自定义校验
    let flag = validate()
    if (flag) {
      await register()
    } else {
      console.log('校验不通过')
    }
  }).catch((err) => {
    console.log('校验不通过')
  })
}

// 自定义校验
const validate = () => {
  let flag = true
  // phone：11位数字
  const phoneReg = /^[1][0-9]{10}$/
  if (!phoneReg.test(valiFormData.phone)) {
    flag = false
    uni.showToast({
      title: '手机号码格式不正确',
      icon: 'none'
    })
    return flag
  }

  // 确认密码与密码相同
  if (valiFormData.password !== valiFormData.Rpassword) {
    flag = false
    uni.showToast({
      title: '两次密码不一致',
      icon: 'none'
    })
    return flag
  }
  return flag
}

const dataStore = useDataStore()
// 注册request
const register = async () => {
  await uni.request({
    url: dataStore.requestPrefix + '/supervisor/register',
    method: 'POST',
    data: {
      // TODO 注册页面，补充请求参数,同时res处理
      phoneNumber: valiFormData.phone,
      name: valiFormData.name,
      birthday: valiFormData.age + 2024,
      sex: valiFormData.sex,
      password: valiFormData.password,
      remarks: 'remarks'
    },
    success: (res) => {
      console.log(res)
    }
  })
}
</script>

<style scoped>

</style>