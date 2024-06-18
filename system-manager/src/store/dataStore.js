import {defineStore} from "pinia";
import {getGridList, getPublicSupervisionData} from "../api/data.js";

export const useDataStore = defineStore("data", {
    state: () => ({
        gridData: [],
    }),
    actions: {
        async getPublicSupervisionData(index) {
            return await getPublicSupervisionData(index)
        },
        async getGridList() {
            this.gridData = await getGridList()
        }
    }
})