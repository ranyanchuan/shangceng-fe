import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`,
    "GET_QUOTA":  `${GROBAL_HTTP_CTX}/quota/list`,
    "SAVE_QUOTE": `${GROBAL_HTTP_CTX}/pm_projectprice_m/save`,
}

/**
 * 获取主列表
 * @param {*} params
 */
export const getQuota = (param) => {
    return request(URL.GET_QUOTA, {
        method: "get",
        param
    });
}

/**
 * 获取当前用户报价列表
 * @param {*} params
 */
export const getQuotes = (params) => {
    return request(URL.GET_QUOTES,{
        method: "get",
        param:params
    })
}

/**
 * 创建保存报价
 * @param {*} params
 */

export const saveQuote = (data) => {
    return request(URL.SAVE_QUOTE,{
        method: "post",
        data:data
    })
}