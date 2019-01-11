import request from "utils/request";
//定义接口地址
const URL = {
    "GET_QUOTA":  `${GROBAL_HTTP_CTX}/quota/list`,
    "ADD_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,
    "UPD_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,
    "DEL_SUBJECT":  `${GROBAL_HTTP_CTX}/quota/subject`,

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
