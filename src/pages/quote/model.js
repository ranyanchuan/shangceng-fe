import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils";
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
        showLoading:false,
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
                }
            ],
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            total: 3,
        },
        subjectModalObj: {
            list: [
                {
                    "index":1,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                },{
                    "index":2,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                },{
                    "index":3,
                    "projectName":"projectName",
                    "price":"price",
                    "unit":"unit",
                    "practice":"practice",
                    "company":"company",
                    "categoryname":"categoryname",
                    "calculateRule":"calculateRule",
                }
            ],
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            total: 3,
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


    }
};
