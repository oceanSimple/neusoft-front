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