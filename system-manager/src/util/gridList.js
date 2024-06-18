import {useDataStore} from "../store/dataStore.js";

export const getProvinces = () => {
    const dataStore = useDataStore()
    const result = new Set()
    for (let i = 0; i < dataStore.gridData.length; i++) {
        result.add(dataStore.gridData[i].province)
    }
    return Array.from(result)
}

export const getCities = (province) => {
    const dataStore = useDataStore()
    const result = new Set()
    for (let i = 0; i < dataStore.gridData.length; i++) {
        if (dataStore.gridData[i].province === province) {
            result.add(dataStore.gridData[i].city)
        }
    }
    return Array.from(result)
}