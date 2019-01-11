import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`,
    "GET_QUOTA":  `${GROBAL_HTTP_CTX}/quota/list`,
    "ADD_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,
    "UPD_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,
    "DEL_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,

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
 *
 * @param {*} params
 */
export const addSubject = (param) => {
    return request(URL.ADD_SUBJECT, {
        method: "post",
        data:param
    });
}

/**
 *
 * @param {*} params
 */
export const updateSubject = (param) => {
    return request(URL.UPD_SUBJECT, {
        method: "post",
        data:param
    });
}


/**
 *
 * @param {*} params
 */
export const delSubject = (param) => {
    return request(URL.DEL_SUBJECT, {
        method: "post",
        data:param
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

