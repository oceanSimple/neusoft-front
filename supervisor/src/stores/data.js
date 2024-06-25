// stores/counter.js
import {defineStore} from 'pinia';

export const useDataStore = defineStore('data', {
    state: () => ({
        requestPrefix: 'http://127.0.0.1:4523/m1/4475331-0-default',
        jwt: '',
        grid: [],
        gridId: 0,
        userInfo: {
            phone: '18293029381',
        }
    }),
    actions: {}
});