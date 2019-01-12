import request from "utils/request";
//定义接口地址
const URL = {
    "GET_DETAIL": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTES": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPrice`,
    "SEL_QUOTA": `${GROBAL_HTTP_CTX}/quota/list`,
    "GET_QUOTA": `${GROBAL_HTTP_CTX}//pm_projectprice_t1/list`,
    "SAVE_QUOTE": `${GROBAL_HTTP_CTX}/pm_projectprice_m/save`,//保存报价
    "GET_PARTS": `${GROBAL_HTTP_CTX}/pm_projectprice_m/getProjectPart`,//获取部位
    "SAVE_PART": `${GROBAL_HTTP_CTX}//pm_projectprice_m/savePart`,//添加部位
    "DELETE_PART": `${GROBAL_HTTP_CTX}/pm_projectprice_m/deletePart`,//删除部位
    "ADD_SUBJECT": `${GROBAL_HTTP_CTX}/pm_projectprice_t1/saveWithList`,
    "UPD_SUBJECT": `${GROBAL_HTTP_CTX}/pm_projectprice_t1/saveBatch`,
    "DEL_SUBJECT": `${GROBAL_HTTP_CTX}/pm_projectprice_t1/deleteBatch`,
    "SAVE_REFER_PART": `${GROBAL_HTTP_CTX}/pm_projectprice_m/refOtherPart`,

    // 打印
    "GET_QUERYPRINTTEMPLATEALLOCATE": `/eiap-plus/appResAllocate/queryPrintTemplateAllocate`,
    "PRINTSERVER": '/print_service/print/preview',
}

/**
 * 获取主列表
 * @param {*} params
 */
export const selectQuota = (param) => {
    return request(URL.SEL_QUOTA, {
        method: "get",
        param
    });
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
        data: param
    });
}

/**
 *
 * @param {*} params
 */
export const updateSubject = (param) => {
    return request(URL.UPD_SUBJECT, {
        method: "post",
        data: param
    });
}


/**
 *
 * @param {*} params
 */
export const delSubject = (param) => {
    return request(URL.DEL_SUBJECT, {
        method: "post",
        data: param
    });
}


/**
 * 获取当前用户报价列表
 * @param {*} params
 */
export const getQuotes = (params) => {
    return request(URL.GET_QUOTES, {
        method: "get",
        param: params
    })
}

/**
 * 创建保存报价
 * @data {*} data
 */
export const saveQuote = (data) => {
    return request(URL.SAVE_QUOTE, {
        method: "post",
        data: data
    })
}

/**
 * 获取当前报价的所有部位
 * @param {*} params
 */
export const getParts = (params) => {
    return request(URL.GET_PARTS, {
        method: "get",
        param: params
    })
}

/**
 * 添加保存部位
 * @data {*} data
 */
export const savePart = (data) => {
    return request(URL.SAVE_PART, {
        method: "post",
        data: data
    })
}

/**
 * 删除部位
 * @data {*} data
 */
export const deletePart = (data) => {
    return request(URL.DELETE_PART, {
        method: "post",
        data: data
    })
}

// 打印

export const queryPrintTemplateAllocate = (params) => {
    return request(URL.GET_QUERYPRINTTEMPLATEALLOCATE, {
        method: "get",
        param: params
    });

}

export const printExcel = (params) => {

    let search = [];
    for (let key in params) {
        search.push(`${key}=${params[key]}`)
    }
    let exportUrl = `${URL.PRINTSERVER}?${search.join('&')}`;
    console.log(exportUrl);
    window.open(exportUrl);

}

/**
 * 保存参考部位
 * @data {*} data
 */
export const saveReferPart = (data) => {
    return request(URL.SAVE_REFER_PART, {
        method: "post",
        data: data
    })
}