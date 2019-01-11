import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`,
    "GET_QUOTA":  `${GROBAL_HTTP_CTX}/quota/list`,
    "SAVE_QUOTE": `${GROBAL_HTTP_CTX}/pm_projectprice_m/save`,//保存报价
    "GET_PARTS": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPart`,//获取部位
    "SAVE_PART": `${GROBAL_HTTP_CTX}//pm_projectprice_m/savePart`,//添加部位
    "DELETE_PART": `${GROBAL_HTTP_CTX}/pm_projectprice_m/deletePart`,//删除部位
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
 * @data {*} data
 */
export const saveQuote = (data) => {
    return request(URL.SAVE_QUOTE,{
        method: "post",
        data:data
    })
}

/**
 * 获取当前报价的所有部位
 * @param {*} params
 */
export const getParts = (params) => {
    return request(URL.GET_PARTS,{
        method: "get",
        param:params
    })
}

/**
 * 添加保存部位
 * @data {*} data
 */
export const addPart = (data) => {
    return request(URL.ADD_PART,{
        method: "post",
        data:data
    })
}

/**
 * 删除部位
 * @data {*} data
 */
export const deletePart = (data) => {
    return request(URL.DELETE_PART,{
        method: "post",
        data:data
    })
}