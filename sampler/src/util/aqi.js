export const aqiLevelToColor = (info) => {
    info.forEach((item) => {
        switch (item.aqi) {
            case 1:
                item.color = '#00e400';
                break;
            case 2:
                item.color = '#ff0';
                break;
            case 3:
                item.color = '#ff7e00';
                break;
            case 4:
                item.color = '#f00';
                break;
            case 5:
                item.color = '#99004c';
                break;
            default:
                item.color = '#7e0023';
                break;
        }
    })
}

export const aqiLevelToDesc = (item) => {
    switch (item.aqi) {
        case 1:
            item.level = '一级';
            item.desc = '优';
            break;
        case 2:
            item.level = '二级';
            item.desc = '良';
            break;
        case 3:
            item.level = '三级';
            item.desc = '轻度污染';
            break;
        case 4:
            item.level = '四级';
            item.desc = '中度污染';
            break;
        case 5:
            item.level = '五级';
            item.desc = '重度污染';
            break;
        default:
            item.level = '六级';
            item.desc = '严重污染';
            break;
    }
}