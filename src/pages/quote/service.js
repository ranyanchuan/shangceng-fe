import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`,
    "GET_QUOTA":  `${GROBAL_HTTP_CTX}/quota/list`,
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

export const getQuotes = (params) => {
    console.log()
    request(URL.GET_QUOTES,{
        method: "get",
        param:params
    })
}
