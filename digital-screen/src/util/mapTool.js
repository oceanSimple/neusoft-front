const getProvinceMap = () => {
    let m = new Map()

    m.set('黑龙江', "黑龙江省")
    m.set('吉林', "吉林省")
    m.set('辽宁', "辽宁省")
    m.set('北京', "北京市")
    m.set('山东', "山东省")
    m.set('福建', "福建省")
    m.set('河北', "河北省")
    m.set('河南', "河南省")
    m.set('重庆', "重庆市")
    m.set('湖北', "湖北省")
    m.set('湖南', "湖南省")
    m.set('江西', "江西省")
    m.set('天津', "天津市")
    m.set('贵州', "贵州省")
    m.set('陕西', "陕西省")
    m.set('新疆', "新疆维吾尔自治区")
    m.set('江苏', "江苏省")
    m.set('安徽', "安徽省")
    m.set('西藏', "西藏自治区")
    m.set('上海', "上海省")
    m.set('吉林', "吉林省")
    m.set('宁夏', "宁夏回族自治区")
    m.set('甘肃', "甘肃省")

    return m
}

export const dealMapRequest = (data) => {
    let m = getProvinceMap()
    let result = []
    for (let i = 0; i < data.length; i++) {
        if (m.has(data[i].province)) {
            let temp = {}
            temp.name = m.get(data[i].province)
            temp.value = data[i].aqicount
            temp.selected = false
            result.push(temp)
        }
    }
    return result
}