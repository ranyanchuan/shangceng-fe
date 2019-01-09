import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import QuotaForm from '../quota-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class QuotaSelectTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectData:[]
        }
    }
    /**
     * 编辑
     */
    edit = () =>{
        console.log('进入编辑');
    }
    /**
     * tabel选中数据
     * @param {*} data
     */
    tabelSelect = (data) => {
        this.setState({
            selectData: data
        })
    }
    render(){
        const self=this;
        const { list,showLoading,pageSize, pageIndex, totalPages } = this.props;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
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
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="quota-select-table">
                <Header title='定额' back={true} />
                <QuotaForm { ...this.props }/>
                <div className="table-list">
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={column}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
            </div>
        )
    }
}