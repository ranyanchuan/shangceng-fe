
import ReactDOM from 'react-dom';
import { Message } from 'tinper-bee';


export const success = (msg) => {
    Message.create({ content: msg, color : 'success'  });
}

export const Error = (msg) => {
    Message.create({ content: msg, color : 'danger'  });
}

export const Warning = (msg) => {
    Message.create({ content: msg, color : 'warning' });
}
/**
 * 数据返回统一处理函数
 * @param {*} response
 * @param {*} successMsg 成功提示
 */
export const processData = (response, successMsg) => {
    let result={};
    try {
        if (typeof response != 'object') {
            Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台');
            throw new Error('数据返回出错：1、请确保服务运行正常；2、请确保您的前端工程代理服务正常；3、请确认您已在本地登录过应用平台')
        }
        if (response.status == '401') {
            Error(`错误:${(response.data.msg)}`);
            throw new Error(`错误:${(response.data.msg)}`);
        }
        if (response.status == '200') {
            let data = response.data;
            let repMsg = data.success;
            if (repMsg == 'success') {
                if (successMsg) {
                    success(successMsg);
                }
                result.status = repMsg;
                // 删除成功没有 data 值
                result.data = data.detailMsg.data || {};
                return {result};
            } else if (repMsg == 'fail_field') {
                Error(`错误:${(data && data.detailMsg && convert(data.detailMsg.msg)) || '数据返回出错'}`);
                throw new Error(`错误:${(data && data.detailMsg && convert(data.detailMsg.msg)) || '数据返回出错'}`)
            } else {
                Error(`错误:${convert(data.message)}`);
                throw new Error(`错误:${convert(data.message)}`);
            }
        } else {
            Error('请求错误');
        }

    } catch (e) {
        return {result};
    }
}


/**
 * param拼接到url地址上
 * @param {*} url
 * @param {*} params
 * @param {*} prefix
 */
export const paramToUrl = (url,params,prefix) =>{
    if(!prefix)prefix='';
    if(url.indexOf('?')==-1){
        url += '?r='+Math.random();
    }
    for(let attr in params){
        if((attr=='pageIndex')||(attr=='pageSize')){
            url+='&'+attr+'='+params[attr];
        }else{
            url+='&'+prefix+attr+'='+params[attr];
        }
    }
    return url;
}

// 后台乱码转换
export const convert = (text) => {
    let element = document.createElement("p");
    element.innerHTML = text;
    let output = element.innerText || element.textContent;
    console.log("output",output);
    element = null;
    return output;
}

export const setCookie = (name, value, options) => {

    options = options || {};
    if (value === null) {
        value = '';
        options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires == 'number') {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
            date = options.expires;
        }
        expires = '; expires=' + date.toUTCString();
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [ cookie, expires, path, domain, secure ].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [ name, '=', encodeURIComponent(value) ].join('');
    var cookie = [ c, expires, path, domain, secure ].join('')
    document.cookie = cookie;

}

export const getCookie = (name) => {

    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    // 按照总设部规范，调整为下划线
    if(cookieValue != null && typeof cookieValue != 'undefined'){
        cookieValue = cookieValue.replace(/-/,"_");
    }
    return cookieValue;
}

// 数组深克隆
export function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

/**
 * 生成唯一字符串
 */
export function uuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i += 1) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = '-';
    s[13] = '-';
    s[18] = '-';
    s[23] = '-';
    return s.join('');
}


/**
 * 对请求回来带有分页的数据 解构，拼装
 * @param obj
 * @param param
 * @returns {{list: *, pageIndex: *, totalPages: *, total: *, pageSize: *}}
 */
export function structureObj(obj, param) {
    const {content, number, totalPages, totalElements, size} = obj;
    let {pageSize} = param;
    if (!pageSize) {
        pageSize = size;
    }
    return {
        list: content,
        pageIndex: number + 1,
        totalPages: totalPages,
        total: totalElements,
        pageSize,// 结构请求的pageSize,
    };

}

/**
 * 初始化 state 里的带有分页的 obj
 * @param obj
 * @returns {{list: Array, pageIndex: number, totalPages: number, total: number, pageSize: *}}
 */
export function initStateObj(obj) {
    const {pageSize} = obj;
    return {
        list: [],
        pageIndex: 0,
        totalPages: 0,
        total: 0,
        pageSize,
    };

}
