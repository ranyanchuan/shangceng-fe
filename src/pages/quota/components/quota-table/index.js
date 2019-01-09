import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Table,Button } from 'tinper-bee'
import moment from "moment/moment";

import './index.less'

// QuotaTable 组件定义
class QuotaTable extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    /**
     * 编辑,详情，增加
     */
    cellClick = async(record, editFlag) => {


        actions.routing.push(
            {
                pathname: 'quota-edit',
                detailObj: record,
                editFlag: !!editFlag
            }
        )
    }
    delItem = (record, index) => {
        actions.quota.delItem({
            param: [{ id: record.id,ts: record.ts }],
            index: index
        });
    }
    /**
     *
     */
    render(){
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 80,
                render(record, text, index) {
                    return index + 1;
                }
            },
                {
                    title: "编码",
                    dataIndex: "coding",
                    key: "coding",
                    width: 100,
                },
                {
                    title: "单位",
                    dataIndex: "unit",
                    key: "unit",
                    width: 100,
                },
                {
                    title: "工艺做法",
                    dataIndex: "practice",
                    key: "practice",
                    width: 100,
                },
                {
                    title: "计算规则",
                    dataIndex: "calculateRule",
                    key: "calculateRule",
                    width: 100,
                },
                {
                    title: "单价",
                    dataIndex: "price",
                    key: "price",
                    width: 100,
                },
                {
                    title: "类别名称",
                    dataIndex: "categoryname",
                    key: "categoryname",
                    width: 100,
                },
                {
                    title: "所属公司",
                    dataIndex: "company",
                    key: "company",
                    width: 100,
                },
                {
                    title: "类型",
                    dataIndex: "category",
                    key: "category",
                    width: 100,
                },
                {
                    title: "项目名称",
                    dataIndex: "projectName",
                    key: "projectName",
                    width: 100,
                },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.cellClick(record, true) }}>编辑</Button>
                            <Button size='sm' className='del-btn' onClick={() => { self.delItem(record, index) }}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        const { list,showLoading,pageSize, pageIndex, totalPages, } = this.props;
        return (
            <div className="table-list">
                <div className='table-header'>
                    <Button
                        size="sm"
                        colors="primary"
                        shape="border"
                        onClick={() => { self.cellClick({}, true) }}>
                        新增
                    </Button>
                </div>
                <Table
                    loading={{show:showLoading,loadingType:"line"}}
                    rowKey={(r,i)=>i}
                    columns={column}
                    data={list}
                />
            </div>
        )
    }
}

export default QuotaTable