import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Icon, Loading, Button, Info} from 'tinper-bee';
import Grid from 'components/Grid';
import Alert from 'components/Alert';
import FactoryComp from './FactoryComp';
import SubjectModal from './SubjectModal';


import {deepClone, Warning, getPageParam} from "utils";

import 'bee-complex-grid/build/Grid.css';
import 'bee-pagination/build/Pagination.css'
import 'bee-table/build/Table.css';
import 'bee-input-number/build/InputNumber.css';
import './index.less';

class Subject extends Component {


    constructor(props) {
        super(props);
        this.state = {
            addSubModalVisible: false,
            showPopAlert: false,
            selectData: [],
        }
    }


    componentDidMount() {
        // actions.quote.loadSubjectList(); // 查询默认条件

    }

    getQuery = (param = {}) => {
        const {selectedPartId} = this.props;
        param.search_pid = selectedPartId;
        actions.quote.loadSubjectList(param); // 查询默认条件
    }


    onCloseModal = () => {
        this.setState({addSubModalVisible: false});
    }

    changeAllData = (field, value, index) => {
        const {subjectObj} = this.props;
        const {list} = subjectObj;
        list[index][field] = value;
        subjectObj.list = list;
        actions.quote.updateState({subjectObj: subjectObj});
    }

    getSelectedDataFunc = (selectData) => {
        this.setState({selectData});
    }

    onClickDelConfirm = () => {
        const {selectData} = this.state;
        if (selectData.length === 0) {
            Info('请勾选数据后再删除');
        } else {
            this.setState({showPopAlert: true});
        }
    }


    onClickCell = () => {
        console.log("=====")
    }


    /**
     *
     * @param {Number} pageIndex 跳转指定页数
     */
    freshData = (pageIndex) => {
        this.onPageSelect(pageIndex, 0);
    }


    /**
     *
     *
     * @param {Number} pageIndex 当前分页值 第几条
     * @param {Number} value 分页条数
     * @param {string} tableObj 分页table
     */
    onDataNumSelect = (pageIndex, value) => {
        this.onPageSelect(value, 1);
    }

    /**
     *
     * @param {Number} value pageIndex或者pageSize值
     * @param {Number} type type为0标识为 pageIndex,为1标识 pageSize,
     * @param {string} tableName 分页 table 名称
     */
    onPageSelect = (value, type) => {
        let {subjectObj} = this.props;
        let {pageIndex, pageSize} = getPageParam(value, type, subjectObj);
        let param = {pageSize, pageIndex};
        this.getQuery(param);
    }


    detailColumn = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 60,
            render: (text, record, index) => <div>{index + 1}</div>
        },
        {
            title: "项目名称",
            dataIndex: "ppDetailName",
            key: "ppDetailName",
            width: 100,
        },
        {
            title: "单价",
            dataIndex: "ppUnitPrice",
            key: "ppUnitPrice",
            width: 80,
            className: 'column-number-right ', // 靠右对齐
            render: (text, record, index) => {
                return (<span>{(typeof text) === 'number' ? text.toFixed(2) : ""}</span>)
            }
        },
        {
            title: "单位",
            dataIndex: "ppUnitEnumValue",
            key: "ppUnitEnumValue",
            width: 80,
        },
        {
            title: "工程量",
            dataIndex: "ppQuantity",
            key: "ppQuantity",
            width: 160,
            className: 'column-number-right ', // 靠右对齐
            render: (text, record, index) => {
                return <FactoryComp
                    type='ppQuantity'//物料数量业务组件类型
                    value={text}//初始化值
                    field='ppQuantity'//修改的字段
                    index={index}//字段的行号
                    // required={true}//必输项
                    record={record}//记录集用于多字段处理
                    onChange={this.changeAllData}//回调函数
                    // onValidate={this.onValidate}//校验的回调
                />
            }
        },
        {
            title: "小计",
            dataIndex: "ppSubtotal",
            key: "ppSubtotal",
            className: 'column-number-right ', // 靠右对齐
            width: 80,
            render: (text, record, index) => {
                return (<span>{(typeof text) === 'number' ? text.toFixed(2) : ""}</span>)
            }
        },
        {
            title: "工业说明",
            dataIndex: "ppProcessDescription",
            key: "ppProcessDescription",
            width: 400,

        },
        {
            title: "计算方法",
            dataIndex: "ppComputeMethod",
            key: "ppComputeMethod",
            width: 400,
        }, {
            title: "操作",
            dataIndex: "action",
            key: "action",
            fixed: "right",
            width: 55,
            render(text, record, index) {
                const _this = this;
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf uf-del' onClick={() => {
                            _this.onClickCell(record)
                        }}></i>
                    </div>
                )
            }
        },

    ];

    onCheckSubject = () => {
        this.setState({addSubModalVisible: true});
    }

    onUpdateSubject = () => {
        const subjectObj = deepClone(this.props.subjectObj);
        const {list} = subjectObj;
        const editSelectData = list.map((item) => {
            item['_checked'] = false;
            item['_status'] = 'edit';
            item['_edit'] = true;
            return item;
        })
        subjectObj.list = editSelectData;
        actions.quote.updateState({subjectObj: subjectObj});
    }


    onSaveSubject = async () => {
        const subjectObj = deepClone(this.props.subjectObj);
        const list = subjectObj.list.filter((item) => {
            return item._status === 'edit';
        })
        const status = await actions.quote.updateSubject(list);
        const {ppcusid}=this.props;
        if (status) {
            actions.quote.getQuotes({id: ppcusid})
        }
    }

    /**
     *
     * 删除子表选中的数据
     * @param {Number} type 1、取消 2、确定
     * @memberof Order
     */
    async confirmDel(type) {
        this.setState({showPopAlert: false});
        const _this = this;
        if (type === 1) { // 确定
            const {selectData} = this.state;
            const status = await actions.quote.delSubject(selectData);
            if (status) {
                _this.setState({selectData: []});
                _this.getQuery();
            }
        }
        this.setState({showPopAlert: false});
    }


    render() {
        const _this = this;
        const {subjectObj, subjectModalObj, subjectModalLoading, subjectListLoading, partList} = _this.props;
        const {addSubModalVisible, showPopAlert} = _this.state;
        const {selectedPartId, pid} = _this.props;
        const {list = []} = subjectObj;

        const btnStatus = list.length ? false : true;
        const addStatus =partList.length ? false : true;

        const paginationObj = {   // 分页
            horizontalPosition: "right",
            verticalPosition: 'bottom',
            activePage: subjectObj.pageIndex,//当前页
            total: subjectObj.total,//总条数
            items: subjectObj.totalPages,
            freshData: _this.freshData,
            onDataNumSelect: _this.onDataNumSelect,
            showJump: false,
            dataNum: 1,
        }

        return (
            <div className='subject'>
                <div className="subject-header">
                    <div className="desc">
                        <div>第一次报价</div>
                        <div>总额: <span className="money">11000.00</span>元</div>
                        <div>工程造价: <span>10000.00</span>元</div>
                        <div>管理费: <span>500.00</span>元</div>
                        <div className="end"><span>税金: 500.00元</span></div>
                    </div>
                    <div className='table-header'>
                        <Button shape="border" colors="success" size="sm" disabled={addStatus}
                                onClick={this.onCheckSubject}
                        >
                            新增项目
                        </Button>
                        <Button shape="border" colors="success" size="sm" className="del-btn" disabled={btnStatus}
                                onClick={this.onSaveSubject}
                        >
                            保存项目
                        </Button>
                        <Button shape="border" colors="success" size="sm" className="del-btn" disabled={btnStatus}
                                onClick={this.onUpdateSubject}
                        >
                            修改项目
                        </Button>
                        <Button
                            shape="border"
                            colors="danger"
                            size="sm"
                            className="del-btn"
                            disabled={btnStatus}
                            onClick={this.onClickDelConfirm}
                        >
                            批量删除
                        </Button>
                        <Alert
                            show={showPopAlert}
                            context="是否要删除 ?"
                            confirmFn={() => {
                                _this.confirmDel(1)
                            }}
                            cancelFn={() => {
                                _this.confirmDel(2)
                            }}
                        />
                    </div>
                </div>
                <Grid
                    data={subjectObj.list}
                    rowKey={(r, i) => r.id}
                    columns={this.detailColumn}
                    paginationObj={paginationObj}
                    // columnFilterAble={rowEditStatus}
                    // showHeaderMenu={rowEditStatus}
                    // dragborder={rowEditStatus}
                    // draggable={rowEditStatus}
                    // syncHover={rowEditStatus}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                    emptyText={() => <Icon style={{"fontSize": "60px"}} type="uf-nodata"/>}
                    loading={{show: subjectListLoading, loadingType: "line"}}
                />
                <SubjectModal
                    modalVisible={addSubModalVisible}
                    subjectModalObj={subjectModalObj}
                    onCloseModal={_this.onCloseModal}
                    subjectModalLoading={subjectModalLoading}
                    subjectObj={subjectObj}
                    id={selectedPartId}
                    pid={pid}
                />
            </div>
        )
    }
}

export default Subject;
