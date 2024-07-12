// 判断aqi等级 1-6
export function getAqiLevel(aqi) {
    if (aqi <= 50) {
        return 1;
    } else if (aqi <= 100) {
        return 2;
    } else if (aqi <= 150) {
        return 3;
    } else if (aqi <= 200) {
        return 4;
    } else if (aqi <= 300) {
        return 5;
    } else {
        return 6;
    }
}

// 根据aqi等级返回对应的描述
export function getAqiLevelDesc(aqi) {
    if (aqi <= 50) {
        return "优";
    } else if (aqi <= 100) {
        return "良";
    } else if (aqi <= 150) {
        return "轻度污染";
    } else if (aqi <= 200) {
        return "中度污染";
    } else if (aqi <= 300) {
        return "重度污染";
    } else {
        return "严重污染";
    }
}

// 传入n个aqi指标，统计每个level的个数
export function getAqiLevelCount(aqis) {
    const levels = [0, 0, 0, 0, 0, 0];
    aqis.forEach(aqi => {
        levels[getAqiLevel(aqi) - 1]++;
    });
    return levels;
}

// 将aqi数字转换成aqi等级、等级描述以及颜色标记
export function getAqiLevelInfo(records) {
    for (let i = 0; i < records.length; i++) {
        if (records[i].aqi === 1) {
            records[i].level = 1;
            records[i].levelDesc = "优";
            records[i].color = "#00e400";
        } else if (records[i].aqi === 2) {
            records[i].level = 2;
            records[i].levelDesc = "良";
            records[i].color = "#d2d223";
        } else if (records[i].aqi === 3) {
            records[i].level = 3;
            records[i].levelDesc = "轻度污染";
            records[i].color = "#ff7e00";
        } else if (records[i].aqi === 4) {
            records[i].level = 4;
            records[i].levelDesc = "中度污染";
            records[i].color = "#f00";
        } else if (records[i].aqi === 5) {
            records[i].level = 5;
            records[i].levelDesc = "重度污染";
            records[i].color = "#99004c";
        } else {
            records[i].level = 6;
            records[i].levelDesc = "严重污染";
            records[i].color = "#7e0023";
        }
    }
}

// export function getAqiLevelInfo(records) {
//     for (let i = 0; i < records.length; i++) {
//         if (records[i].aqi <= 50) {
//             records[i].level = 1;
//             records[i].levelDesc = "优";
//             records[i].color = "#00e400";
//         } else if (records[i].aqi <= 100) {
//             records[i].level = 2;
//             records[i].levelDesc = "良";
//             records[i].color = "#d2d223";
//         } else if (records[i].aqi <= 150) {
//             records[i].level = 3;
//             records[i].levelDesc = "轻度污染";
//             records[i].color = "#ff7e00";
//         } else if (records[i].aqi <= 200) {
//             records[i].level = 4;
//             records[i].levelDesc = "中度污染";
//             records[i].color = "#f00";
//         } else if (records[i].aqi <= 300) {
//             records[i].level = 5;
//             records[i].levelDesc = "重度污染";
//             records[i].color = "#99004c";
//         } else {
//             records[i].level = 6;
//             records[i].levelDesc = "严重污染";
//             records[i].color = "#7e0023";
//         }
//     }
// }