const getProvinceMap = () => {
    let m = new Map()

    m.set('黑龙江', "黑龙江省")
    m.set('吉林', "吉林省")
    m.set('辽宁', "辽宁省")
    m.set('北京', "北京市")


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