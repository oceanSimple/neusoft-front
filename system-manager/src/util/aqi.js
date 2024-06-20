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


// 传入n个aqi指标，统计每个level的个数
export function getAqiLevelCount(aqis) {
    const levels = [0, 0, 0, 0, 0, 0];
    aqis.forEach(aqi => {
        levels[getAqiLevel(aqi) - 1]++;
    });
    return levels;
}