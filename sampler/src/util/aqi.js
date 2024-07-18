export const aqiLevelToColor = (info) => {
    info.forEach((item) => {
        switch (item.aqi) {
            case 1:
                item.color = '#00e400';
                break;
            case 2:
                item.color = '#cccc06';
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
            item.number = 1;
            break;
        case 2:
            item.level = '二级';
            item.desc = '良';
            item.number = 2;
            break;
        case 3:
            item.level = '三级';
            item.desc = '轻度污染';
            item.number = 3;
            break;
        case 4:
            item.level = '四级';
            item.desc = '中度污染';
            item.number = 4;
            break;
        case 5:
            item.level = '五级';
            item.desc = '重度污染';
            item.number = 5;
            break;
        default:
            item.level = '六级';
            item.desc = '严重污染';
            item.number = 6;
            break;
    }
}