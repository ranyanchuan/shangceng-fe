import {
    actions
} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import {
    processData,
    deepClone,
    structureObj,
    initStateObj,
    uuid,
    Warning
} from "utils";
import moment from 'moment';

/**
 *          btnFlag为按钮状态，新增、修改是可编辑，查看详情不可编辑，
 *          新增表格为空
 *          修改需要将行数据带上并显示在卡片页面
 *          查看详情携带行数据但是表格不可编辑
 *          0表示新增、1表示编辑，2表示查看详情 3提交
 *async loadList(param, getState) {
 *          rowData为行数据
 */


export default {
    // 确定 Store 中的数据模型作用域
    name: "quote",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        ppcusname: '',// 客户名称
        ppcusid: '',//   客户id
        ppcusno: '', //  客户编码
        ppcusaddress: '', //项目地址
        ppdesignCenter: '',// 设计中心

        pid: '',// 报价主表id
        selectedPartId: '',//选中部位的id

        showLoading: false,
        quoteIndex: 0,
        quoteList: [],
        partIndex: 0,

        partList: [],
        partName: '',

        quoteMoney: {},

        subjectListLoading: false,
        subjectObj: {
            list: [],
            pageIndex: 0,
            pageSize: 10,
            totalPages: 0,
            total: 0,
        },
        subjectModalLoading: false,
        subjectModalObj: {
            list: [],
            pageIndex: 0,
            pageSize: 10,
            totalPages: 0,
            total: 0,
        },
        ohterQuotes: [],//参照其他项目报价
        otherParts: []//参照其他部位列表
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {
        //获取选中客户所有报价
        async getQuotes(param, getState) {
            actions.quote.updateState({showLoading: true});
            const {result} = processData(await api.getQuotes(param));
            const {status, data} = result;
            actions.quote.updateState({showLoading: false, quoteList: data, quoteIndex: 0});
            if (status === 'success' && data.length > 0) {
                const {id} = data[0];
                actions.quote.updateState({pid: id, quoteMoney: data[0]});
                actions.quote.getParts({id});
            } else {
                // 如果请求出错,数据初始化
                const {subjectObj} = getState().quote;
                const partList = [];
                actions.quote.updateState({subjectObj: initStateObj(subjectObj), partList, partIndex: 0});
            }
        },

        //获取选中客户所有报价
        async getQuoteDesc(param, getState) {
            actions.quote.updateState({showLoading: true});
            const {result} = processData(await api.getQuotes(param));
            const {status, data} = result;

            actions.quote.updateState({showLoading: false});
            if (status === 'success' && data.length > 0) {
                const {quoteIndex} = getState().quote;
                actions.quote.updateState({quoteMoney: data[quoteIndex],quoteList:data});
                const {pid: id} = getState().quote;
                actions.quote.getPartDesc({id});
            }
        },

        //获取选中客户所有报价
        async getPartDesc(param, getState) {
            actions.quote.updateState({showPartLoading: true});
            const {result} = processData(await api.getParts(param));
            const {data, status} = result;
            actions.quote.updateState({partList: data, showPartLoading: false});
        },


        //创建报价
        async createQuote(param, getState) {
            const {ppcusid: id} = getState().quote;
            processData(await api.saveQuote(param))
            actions.quote.getQuotes({id})
        },

        //获取当前报价所包含的部位
        async getParts(param, getState) {
            actions.quote.updateState({showPartLoading: true});
            const {result} = processData(await api.getParts(param));
            const {data, status} = result;

            actions.quote.updateState({partList: data, showPartLoading: false, partIndex: 0});
            if (status === 'success' && data.length > 0) {
                const {id} = data[0];
                actions.quote.updateState({selectedPartId: id});
                actions.quote.loadSubjectList({search_pid: id});
            } else {
                // 如果请求出错,数据初始化
                const {subjectObj} = getState().quote;
                actions.quote.updateState({subjectObj: initStateObj(subjectObj)});
            }
        },

        //添加部位
        async addPart(param, getState) {
            const {partName, ppcusid, ppcusno, pid} = param;
            const _partName = partName.trim();
            if (!_partName) {
                Warning("请输入部位名称")
                return;
            }

            processData(await api.savePart({
                cusid: ppcusid,
                cusCode: ppcusno,
                pid: pid,
                ppPositionName: _partName
            }))

            const response = processData(await api.getParts({id: pid}));
            const {data: partList} = response.result;
            actions.quote.updateState({
                partList,
                partName: ''
            });
        },

        //删除部位
        async deletePart(param, getState) {
            const {pid} = getState().quote;
            const {result} = processData(await api.deletePart(param));
            const {status} = result;
            if (status === 'success') {
                actions.quote.getParts({id: pid});
            }
        },

        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadQuotaListModal(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectModalLoading: true});
            const {result} = processData(await api.selectQuota(param));  // 调用 getList 请求数据
            const {data} = result;
            actions.quote.updateState({subjectModalLoading: false});
            if (data) {
                const subjectModalObj = structureObj(data, param);
                actions.quote.updateState({subjectModalObj}); // 更新数据和查询条件
            } else {
                // 如果请求出错,数据初始化
                const {subjectModalObj} = getState().quote;
                actions.quote.updateState({subjectModalObj: initStateObj(subjectModalObj)});
            }
        },

        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async addSubject(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectModalLoading: true,});
            const {result} = processData(await api.addSubject(param), '添加成功');  // 调用 getList 请求数据
            const {data = []} = result;
            actions.quote.updateState({subjectModalLoading: false});
            return data;

        },
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async updateSubject(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectListLoading: true});
            const {result} = processData(await api.updateSubject(param), '保存成功');  // 调用 getList 请求数据
            const {status} = result;
            actions.quote.updateState({subjectListLoading: false});
            return status === 'success' ? true : false;
        },
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async delSubject(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectListLoading: true});
            const {result} = processData(await api.delSubject(param), '删除成功');  // 调用 getList 请求数据
            const {status} = result;
            actions.quote.updateState({subjectListLoading: false});
            return status === 'success' ? true : false;
        },


        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadSubjectList(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectListLoading: true});
            const {result} = processData(await api.getQuota(param));  // 调用 getList 请求数据
            const {data} = result;
            actions.quote.updateState({subjectListLoading: false});
            if (data) {
                const subjectObj = structureObj(data, param);
                actions.quote.updateState({subjectObj}); // 更新数据和查询条件
            } else {
                // 如果请求出错,数据初始化
                const {subjectObj} = getState().quote;
                actions.quote.updateState({subjectObj: initStateObj(subjectObj)});
            }
        },

        //获取参考部位
        async getReferParts(param, getState) {
            const {partName, pid} = getState().quote;
            const res = processData(await api.getParts({id: pid}));
            actions.quote.updateState({
                otherParts: res.result.data
            })
        },

        //保存参考部位
        async saveReferPart(param, getState) {
            const {pid: id} = getState().quote;
            console.log("保存参考部位param", param);
            const res = processData(await api.saveReferPart(param));
            console.log("保存参考部位res", res)
            actions.quote.getParts({id});

        },

        //报价单打印
        async printExcel(param) {
            let {result} = processData(await api.queryPrintTemplateAllocate(param.queryParams), '');
            const {data: res} = result;
            if (!res || !res.res_code) return false;
            await api.printExcel({
                tenantId: 'tenant',
                printcode: res.res_code,
                serverUrl: `${GROBAL_HTTP_CTX}/pm_projectprice_m/dataForPrint`,
                params: encodeURIComponent(JSON.stringify(param.printParams)),
                sendType: 'post'
            })
        },

        //获取其他项目报价
        async getOtherQuotes(param, getState) {
            const {ppcusid: id} = getState().quote;
            const res = processData(await api.getOtherQuotes({id}));

            console.log(res);
            const {data: ohterQuotes} = res.result;
            actions.quote.updateState({ohterQuotes})
        },

        //保存参照项目报价
        async saveReferQuote(param, getState) {
            const {ppcusid: id} = getState().quote;
            const res = processData(await api.saveReferQuote(param));
            console.log(res);
            actions.quote.getQuotes({id})
        },

        //保存参照项目报价
        async submitPrice(param, getState) {
            const {pid, quoteList, quoteIndex} = getState().quote;
            actions.quote.updateState({showLoading: true});
            const {result} = processData(await api.submitPrice({id: pid}), '提交保存成功');
            actions.quote.updateState({showLoading: false});
            const {status} = result;
            if (status === "success") {
                quoteList[quoteIndex]['usedFlag'] = "1";
                actions.quote.updateState({quoteList});
            }

        }
    }
};
