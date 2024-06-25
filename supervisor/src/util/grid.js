export const getProvince = (gridInfo) => {
    let result = [];
    for (let i = 0; i < gridInfo.length; i++) {
        result.push({
            value: gridInfo[i].province,
            text: gridInfo[i].province
        });
    }
    return result;
}

export const getCity = (province, grinInfo) => {
    let result = [];
    for (let i = 0; i < grinInfo.length; i++) {
        if (grinInfo[i].province === province) {
            result.push({
                value: grinInfo[i].city,
                text: grinInfo[i].city
            });
        }
    }
    return result;
}