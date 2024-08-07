// stores/counter.js
import {defineStore} from 'pinia';

const serverPrefix = 'http://10.1.232.127:8080'
const mockPrefix = 'http://127.0.0.1:4523/m1/4475331-0-default'
const localPrefix = 'http://localhost:8080'
const linuxPrefix = 'http://111.229.78.126:8080'
const cloudPrefix = 'http://172.18.42.107:8084'
export const useDataStore = defineStore('data', {
    state: () => ({
        requestPrefix: cloudPrefix,
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