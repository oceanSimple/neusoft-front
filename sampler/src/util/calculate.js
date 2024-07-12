const AQIList = [0, 50, 100, 150, 200, 300, 400, 500];
const SO2DAYList = [0, 50, 150, 475, 800, 1600, 2100, 2620];
const CODAYList = [0, 2, 4, 14, 24, 36, 48, 60];
const PM25DAYList = [0, 35, 75, 115, 150, 250, 350, 500];
const SO2_TYPE = "SO2";
const PM25_TYPE = "PM25";
const CO_TYPE = "CO";

export function getAQIByParam(SO2, PM25, CO) {
    let list = [];
    if (SO2 > 0) {
        list.push(SO2 >= 2620 ? 500 : getIAQI(SO2_TYPE, SO2));
    }
    if (PM25 > 0) {
        list.push(PM25 >= 500 ? 500 : getIAQI(PM25_TYPE, PM25));
    }
    if (CO > 0) {
        list.push(CO >= 60 ? 500 : getIAQI(CO_TYPE, CO));
    }
    return Math.max(...list);
}

function getIAQI(param, paramValue) {
    let IAQI = -114514;
    switch (param) {
        case SO2_TYPE:
            IAQI = getAQIValue(SO2DAYList, paramValue);
            break;
        case PM25_TYPE:
            IAQI = getAQIValue(PM25DAYList, paramValue);
            break;
        case CO_TYPE:
            IAQI = getAQIValue(CODAYList, paramValue);
            break;
    }
    return IAQI;
}

function getAQIValue(list, paramValue) {
    let IAQI;
    let BPL = 0; // 低位值
    let BPH = 0; // 高位值
    let BPHIndex = 0;
    let IAQIH; // BPH对应的空气质量分指数
    let IAQIL; // BPL对应的空气质量分指数
    for (let i = 0; i < list.length; i++) {
        if (list[i] > Math.floor(paramValue)) {
            BPH = list[i];
            BPL = list[i - 1];
            BPHIndex = i;
            break;
        }
    }
    IAQIH = AQIList[BPHIndex];
    IAQIL = AQIList[BPHIndex - 1];
    let AQI = ((((IAQIH - IAQIL) * 100) / (BPH - BPL)) * 0.01) * (paramValue - BPL) + IAQIL;
    IAQI = Math.ceil(AQI);
    return IAQI;
}

export function getAQILevel(AQI) {
    if (AQI <= 50) {
        return 1;
    } else if (AQI <= 100) {
        return 2;
    } else if (AQI <= 150) {
        return 3;
    } else if (AQI <= 200) {
        return 4;
    } else if (AQI <= 300) {
        return 5;
    } else {
        return 6;
    }
}