import requests from "../util/request.js";

// 获取公共监督table数据
const getPublicSupervisionDataUrl = "/admin/supervisorTaskList"
// 获取网格列表
const getGridListUrl = "/admin/getGridList"
// 查看指定监督员任务
const getSupervisorTaskUrl = "/admin/getSupervisorTask"
// 查看监督员信息
const getSupervisorInfoUrl = "/admin/getSupervisor"
// 查询指定网格
const getGridUrl = "/admin/getGrid"
// 省分组统计
const getProvinceGroupUrl = "/admin/statistics"
// AQI趋势统计
const getAqiTrendUrl = "/admin/aqi2"
// AQi分布统计
const getAqiDistributionUrl = "/admin/aqi1"
// 省会覆盖率
const getProvinceCoverageUrl = "/admin/capital"
// 大城市覆盖率
const getCityCoverageUrl = "/admin/bigcity"
// aqi确认列表
const getAqiConfirmListUrl = "/admin/samplerTaskList"
// 获取指定网格员任务
const getSamplerTaskUrl = "/admin/getSamplerTask"
// 查看指定网格员信息
const getSamplerInfoUrl = "/admin/getSampler"
// 获取“空气质量检测总数量”的值
const aqiTotalUrl = "/admin/total1"
// 获取“空气质量良好”的值
const aqiGoodUrl = "/admin/total2"

export async function getPublicSupervisionData(param) {
    let data = undefined
    await requests.get(getPublicSupervisionDataUrl, {
        params: {
            index: param.index,
            province: param.province,
            city: param.city,
            aqi: param.aqi,
            date: param.date,
            isArranged: param.isArranged,
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

export async function getSupervisorTask(id) {
    let data = undefined
    await requests.get(getSupervisorTaskUrl, {
        params: {
            id: id
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getSupervisorInfo(phoneNumber) {
    let data = undefined
    await requests.get(getSupervisorInfoUrl, {
        params: {
            phoneNumber: phoneNumber
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getGrid(id) {
    let data = undefined
    await requests.get(getGridUrl, {
        params: {
            id: id
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getProvinceGroup() {
    let data = undefined
    await requests.get(getProvinceGroupUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getAqiTrend() {
    let data = undefined
    await requests.get(getAqiTrendUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getAqiDistribution() {
    let data = undefined
    await requests.get(getAqiDistributionUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getProvinceCoverage() {
    let data = undefined
    await requests.get(getProvinceCoverageUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getCityCoverage() {
    let data = undefined
    await requests.get(getCityCoverageUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getAqiConfirmList(param) {
    let data = undefined
    await requests.get(getAqiConfirmListUrl, {
        params: {
            index: param.index,
            province: param.province,
            city: param.city,
            date: param.date,
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getSamplerTask(id) {
    let data = undefined
    await requests.get(getSamplerTaskUrl, {
        params: {
            id: id
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getSamplerInfo(id) {
    let data = undefined
    await requests.get(getSamplerInfoUrl, {
        params: {
            id: id,
        }
    })
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getAqiTotal() {
    let data = undefined
    await requests.get(aqiTotalUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}

export async function getAqiGood() {
    let data = undefined
    await requests.get(aqiGoodUrl)
        .then(res => {
            data = res.data
        }).catch(err => {
            console.log(err)
        })
    return data
}