import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`
}

/**
 * 获取列表
 * @param {*} params
 */
export const getList = (params) => {

}

export const getQuotes = (params) => {
    request(URL.GET_QUOTES,{
        method: "POST",
        params:params
    })
}