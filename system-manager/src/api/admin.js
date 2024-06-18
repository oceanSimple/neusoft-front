import axios from "axios";
import {baseUrl} from "../util/request.js";

const loginUrl = baseUrl + '/admin/login' // 登录接口

export async function adminLogin(code, password) {
    let data = undefined
    await axios.post(loginUrl, {
        code: code,
        password: password
    }).then(res => {
        // 登录成功
        data = res.data
    }).catch(err => {
        console.log(err)
    })
    return data
}