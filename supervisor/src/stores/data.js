// stores/counter.js
import {defineStore} from 'pinia';

const serverPrefix = 'http://10.1.232.127:8080'
const mockPrefix = 'http://127.0.0.1:4523/m1/4475331-0-default'
export const useDataStore = defineStore('data', {
    state: () => ({
        requestPrefix: serverPrefix,
        jwt: '',
        grid: [],
        gridId: 0,
        userInfo: {
            phone: '18293029381',
        },
        selectedProvince: '请选择省份',
        selectedCity: '请选择城市',
    }),
    actions: {}
});