import { get } from "@/axios/http.js";

export default {
    // 查询覆盖区域
    getCoverageArea:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getCoverageArea.do`, params);
    },
    // 查询节能减排信息
    getEnergy:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getEnergy.do`, params);
    },
    // 查询并网信息
    getGrid:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getGrid.do`, params);
    },
    // 查询安装横轴信息
    getInstallShaft:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getInstallShaft.do`, params);
    },
    // 查询安装信息
    getInstallt:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getInstallt.do`, params);
    },
    // 查询地图信息
    getMap:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getMap.do`, params);
    },
    // 查询月发电量信息
    getMonthElectricity:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getMonthElectricity.do`, params);
    },
    // 查询获单信息
    getOrder:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getOrder.do`, params);
    },
    // 查询建站排行榜
    getStationRank:(params:any | undefined) => {
        return get(`/reportapi/light/screen/getStationRank.do`, params);
    },
	// 获取运维工单统计
	getWorkOrderCount:(params:any | undefined) => {
	    return get(`/reportapi/light/screen/getWorkOrderCount.do`, params);
	},
	// 获取运维工单过期/未过期百分比
	getWorkPercent:(params:any | undefined) => {
	    return get(`/reportapi/light/screen/getWorkPercent.do`, params);
	},
	// 获取运维工单服务中/已闭环
	getWorkTotal:(params:any | undefined) => {
	    return get(`/reportapi/light/screen/getWorkTotal.do`, params);
	},
} 