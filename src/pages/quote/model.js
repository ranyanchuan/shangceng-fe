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
        ppcusname:'',// 客户名称
        ppcusid:'',//   客户id
        ppcusno:'', //  客户编码
        ppcusaddress:'', //项目地址
        ppdesignCenter:'',// 设计中心
        
        showLoading: false,
        quoteIndex:0,
        quoteList:[],
        partIndex:0,
        partObj: {
            list: [],
            partVal: ''
        },
        subjectObj: {
            list: [
                {
                    "index":1,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "company":"company",
                    "quantitie":10,
                    "total":310,
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":2,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":103,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":3,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":130,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":4,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "company":"company",
                    "quantitie":10,
                    "total":310,
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":5,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":103,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":6,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":130,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":7,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":103,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":8,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":130,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":9,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":103,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                },{
                    "index":10,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "quantitie":10,
                    "total":130,
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                    "_checked":false,
                    "_status":"edit",
                    "_edit":true,
                }
            ],
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            total: 3,
        },
        subjectModalLoading:false,
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
        //获取选中客户所有报价
        async getQuotes(data,getState){
            const res = processData(await api.getQuotes(data));
            console.log(res)
            if(res.result.status !== "success") {
                Warning("用户报价列表获取失败")
                return;
            };
            actions.quote.updateState({
                quoteList:res.result.data
            })
        },
        //创建报价
        async createQuote(data,getState){
            const { ppcusname, ppcusid, ppcusno, ppcusaddress, ppdesignCenter } = getState().quote;
            if(!ppcusid) {
                Warning("请先选择客户");
                return;
            }
            const res = await api.saveQuote({ ppcusname, ppcusid, ppcusno, ppcusaddress, ppdesignCenter, ppTotalAmount:0 })
            console.log(res)
            if(res.data.success !== "success") {
                Warning("用户报价列表获取失败")
                return;
            };
            actions.quote.updateState({
                quoteList:res.data.detailMsg.data
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
            const {data}=result;
            actions.quote.updateState({subjectModalLoading: false});
            if (data) {
                const subjectModalObj = structureObj(data, param);
                actions.quote.updateState({subjectModalObj}); // 更新数据和查询条件
            } else {
                // 如果请求出错,数据初始化
                const {subjectModalObj} = getState().quote;
                actions.quote.updateState({subjectModalObj: initStateObj(subjectModalObj)});
            }
            debugger
        },



    }
};
