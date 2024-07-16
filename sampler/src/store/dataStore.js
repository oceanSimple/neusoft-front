// stores/dataStore.js
import {defineStore} from 'pinia';
const serverPrefix = 'http://10.1.232.127:8080'
const mockPrefix = 'http://127.0.0.1:4523/m1/4475331-0-default'
const localPrefix = 'http://localhost:8080'
const linuxPrefix = 'http://111.229.78.126:8080'
export const useDataStore = defineStore('data', {
    state: () => ({
        requestPrefix: linuxPrefix,
        jwt: '',
        taskInfo: {},
    }),
});