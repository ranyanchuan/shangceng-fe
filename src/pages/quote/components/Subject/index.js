import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Icon, Loading, Row, Col, Button,Alert} from 'tinper-bee';
import Grid from 'components/Grid';
import FactoryComp from './FactoryComp';


import 'bee-complex-grid/build/Grid.css';
import 'bee-pagination/build/Pagination.css'
import 'bee-table/build/Table.css';
import 'bee-input-number/build/InputNumber.css';
import './index.less';


class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    componentDidMount() {
        // actions.query.loadList(this.props.queryParam); // 查询默认条件
    }

    detailColumn = [
        {
            title: "序号",
            dataIndex: "detailName",
            key: "detailName",
            width: 200
        },
        {
            title: "项目名称",
            dataIndex: "detailModel",
            key: "detailModel",
            width: 200,
        },
        {
            title: "单价",
            dataIndex: "detailModel",
            key: "detailModel",
            width: 200,
        },
        {
            title: "单位",
            dataIndex: "detailModel",
            key: "detailModel",
            width: 200,
        },

        {
            title: "物料数量",
            dataIndex: "detailCount",
            key: "detailCount",
            width: 200,
            className: 'column-number-right ', // 靠右对齐
            render: (text, record, index) => {
                return <FactoryComp
                    type='detailCount'//物料数量业务组件类型
                    value={text}//初始化值
                    field='detailCount'//修改的字段
                    index={index}//字段的行号
                    required={true}//必输项
                    record={record}//记录集用于多字段处理
                    onChange={this.changeAllData}//回调函数
                    // onValidate={this.onValidate}//校验的回调
                />
            }
        },
        {
            title: "小计",
            dataIndex: "detailModel",
            key: "detailModel",
            width: 200,
        },
        {
            title: "工业说明",
            dataIndex: "detailModel",
            key: "detailModel",
            width: 200,
        },
        {
            title: "计算方法",
            dataIndex: "detailDate",
            key: "detailDate",
            width: 200,
        },
        {
            title: "操作",
            dataIndex: "detailName",
            key: "detailName",
            width: 200,
            render(text, record, index) {
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf uf-pencil edit-btn' onClick={() => {
                            self.cellClick(record, 1)
                        }}></i>
                    </div>
                )
            }
        },

    ];


    render() {
        const _this = this;
        console.log("======")
        const {subjectObj} = _this.props;

        const paginationObj = {   // 分页
            horizontalPosition: "right",
            verticalPosition: 'bottom',
            activePage: subjectObj.pageIndex,//当前页
            total: subjectObj.total,//总条数
            items: subjectObj.totalPages,
            freshData: _this.freshData,
            onDataNumSelect: _this.onDataNumSelect,
            dataNum: 1,
            disabled: status !== "view"
        }

        return (
            <div className='subject'>
                <div className='table-header'>
                    <Button shape="border" colors="success" size="sm"
                            onClick={this.handlerNew}
                    >
                        新增项目
                    </Button>
                    <Button
                        shape="border"
                        colors="danger"
                        size="sm"
                        className="del-btn"
                        onClick={this.onClickDelConfirm}
                    >
                        删除
                    </Button>
                    {/*<Alert*/}
                        {/*show={false}*/}
                        {/*context="是否要删除 ?"*/}
                        {/*confirmFn={this.onClickDel}*/}
                        {/*cancelFn={this.onClickPopCancel}*/}
                    {/*/>*/}
                </div>
                <Grid
                    ref={(el) => this.grid = el}
                    data={subjectObj.list}
                    rowKey={(r, i) => r.id ? r.id : r.key}
                    columns={this.detailColumn}
                    paginationObj={paginationObj}
                    // columnFilterAble={rowEditStatus}
                    // showHeaderMenu={rowEditStatus}
                    // dragborder={rowEditStatus}
                    // draggable={rowEditStatus}
                    // syncHover={rowEditStatus}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    emptyText={() => <Icon style={{"fontSize": "60px"}} type="uf-nodata"/>}
                    // loading={{ show: (!showLoading && showDetailLoading), loadingType: "line" }}
                />
            </div>
        )
    }
}

export default Subject;
