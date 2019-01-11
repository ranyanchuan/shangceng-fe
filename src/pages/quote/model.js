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
    uuid
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
        showLoading: false,
        quoteIndex: 0,
        quoteList: [],
        partIndex: 0,
        partObj: {
            list: [],
            partVal: ''
        },

        subjectListLoading: false,
        subjectObj: {
            list: [],
            pageIndex: 2,
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
        //创建报价
        async createQuote(data, getState) {
            const quoteList = deepClone(getState().quote.quoteList);
            quoteList.push({
                id: uuid(),
                quoteName: `第xx次报价`,
                quoteAmount: 0,
                status: 0
            });
            actions.quote.updateState({
                quoteList
            })

        },

        //部位输入框
        async partValChange(data, getState) {
            const partObj = deepClone(getState().quote.partObj);
            partObj.partVal = data.trim();
            actions.quote.updateState({
                partObj
            });

        },
        //添加部位
        async addPart(data, getState) {
            const partObj = deepClone(getState().quote.partObj);
            if (!partObj.partVal) return;
            partObj.list.push({
                partName: partObj.partVal,
                partSubtotal: 0,
                id: uuid()
            });
            partObj.partVal = '';
            actions.quote.updateState({
                partObj
            });
        },

        //删除部位
        async deletePart(data, getState) {
            const partObj = deepClone(getState().quote.partObj);
            partObj.list.splice(data, 1);
            actions.quote.updateState({
                partObj
            });
        },


        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadQuotaListModal(param = {}, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.quote.updateState({subjectModalLoading: true});
            const {result} = processData(await api.getQuota(param));  // 调用 getList 请求数据
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
            actions.quote.updateState({subjectModalLoading: true});
            const {result} = processData(await api.addSubject(param), '添加成功');  // 调用 getList 请求数据
            const {data=[]} = result;
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
            return status==='success'?true:false;
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
            return status==='success'?true:false;
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


    }
};
