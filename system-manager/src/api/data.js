import requests from "../util/request.js";

// 获取公共监督table数据
const getPublicSupervisionDataUrl = "/admin/supervisorTaskList"
// 获取网格列表
const getGridListUrl = "/admin/getGridList"

export async function getPublicSupervisionData(index) {
    let data = undefined
    await requests.get(getPublicSupervisionDataUrl, {
        params: {
            index,
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getGridList() {
    let data = undefined
    await requests.get(getGridListUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}