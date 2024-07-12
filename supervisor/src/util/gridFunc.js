import {cityData} from "./airport";

export const getProvinces = () => {
    let province = [];
    for (let i = 0; i < cityData.length; i++) {
        province.push(cityData[i][0]);
    }
    // 按照拼音排序
    province.sort((a, b) => {
        return a.localeCompare(b, 'zh-CN')
    });
    return province;
}

export const getCities = (province) => {
    for (let i = 0; i < cityData.length; i++) {
        if (cityData[i][0] === province) {
            return cityData[i].slice(1);
        }
    }
}