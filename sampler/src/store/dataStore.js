// stores/dataStore.js
import {defineStore} from 'pinia';
const serverPrefix = 'http://10.1.232.127:8080'
const mockPrefix = 'http://127.0.0.1:4523/m1/4475331-0-default'
export const useDataStore = defineStore('data', {
    state: () => ({
        requestPrefix: serverPrefix,
        jwt: '',
        taskInfo: {},
    }),
});