import {defineStore} from "pinia";
import {
    getAqiConfirmList,
    getAqiDistribution, getAqiGood, getAqiTotal,
    getAqiTrend,
    getCityCoverage,
    getGrid,
    getGridList,
    getProvinceCoverage,
    getProvinceGroup,
    getPublicSupervisionData, getSamplerInfo,
    getSamplerTask,
    getSupervisorInfo,
    getSupervisorTask
} from "../api/data.js";

export const useDataStore = defineStore("data", {
    state: () => ({
        gridData: [],
        publicSupId: 0,
        aqiConfirmInfo: {},
    }),
    actions: {
        async getPublicSupervisionData(param) {
            return await getPublicSupervisionData(param)
        },
        async getGridList() {
            this.gridData = await getGridList()
        },
        async getSupervisorTask(id) {
            return await getSupervisorTask(id)
        },
        async getSupervisorInfo(phoneNumber) {
            return await getSupervisorInfo(phoneNumber)
        },
        async getGridData(id) {
            return await getGrid(id)
        },
        async getProvinceData() {
            return await getProvinceGroup()
        },
        async getAqiTrendData() {
            return await getAqiTrend()
        },
        async getAqiDistributionData() {
            return await getAqiDistribution()
        },
        async getProvinceCoverageData() {
            return await getProvinceCoverage()
        },
        async getCityCoverageData() {
            return await getCityCoverage()
        },
        async getAqiConfirmData(param) {
            return await getAqiConfirmList(param)
        },
        async getSamplerData(id) {
            return await getSamplerTask(id)
        },
        async getSamplerInfo(id) {
            return await getSamplerInfo(id)
        },
        async getAqiTotal() {
            return await getAqiTotal()
        },
        async getAqiGood() {
            return await getAqiGood()
        }
    }
})