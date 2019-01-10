import React, {Component} from 'react';
import {actions} from 'mirrorx';
import {Icon, Loading, Button,Info} from 'tinper-bee';
import Grid from 'components/Grid';
import Alert from 'components/Alert';
import FactoryComp from './FactoryComp';
import SubjectModal from './SubjectModal';


import 'bee-complex-grid/build/Grid.css';
import 'bee-pagination/build/Pagination.css'
import 'bee-table/build/Table.css';
import 'bee-input-number/build/InputNumber.css';
import './index.less';


class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addSubModalVisible:false,
            showPopAlert:false,
            selectData:[],
        }
    }


    // componentDidMount() {
    //     // actions.query.loadList(this.props.queryParam); // 查询默认条件
    // }


    onCheckSubject=()=>{
        this.setState({addSubModalVisible:true});
    }

    onCloseModal=()=>{
        this.setState({addSubModalVisible:false});
    }

    changeAllData=(field, value, index)=>{
        console.log("field, value, index",field, value, index);
    }

    getSelectedDataFunc=(selectData)=>{
        this.setState({ selectData });
    }

    onClickDelConfirm=()=>{
        const { selectData } = this.state;
        if (selectData.length === 0) {
            Info('请勾选数据后再删除');
        } else {
            this.setState({ showPopAlert: true });
        }
    }


    onClickCell=()=>{
        console.log("=====")
    }

    /**
     *
     * 删除子表选中的数据
     * @param {Number} type 1、取消 2、确定
     * @memberof Order
     */
    async confirmDel(type) {
        this.setState({ showPopAlert: false });
        if (type === 1) { // 确定
            const { selectData, searchId } = this.state;
            // if (this.clearOldData()) {
            //     const { status } = await actions.masterDetailOne.delOrderDetail(selectData);
            //     if (status === "success") {
            //         actions.masterDetailOne.queryChild({ search_orderId: searchId }); // 获取子表
            //         this.oldData = []; //清空用于编辑和添加的缓存数据
            //     }
            // }
        }
        this.setState({ showPopAlert: false });
    }



    detailColumn = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 50
        },
        {
            title: "项目名称",
            dataIndex: "projectName",
            key: "projectName",
            width: 100,
        },
        {
            title: "单价",
            dataIndex: "price",
            key: "price",
            width: 50,
        },
        {
            title: "单位",
            dataIndex: "unit",
            key: "unit",
            width: 50,
        },

        // {
        //     title: "工程量",
        //     dataIndex: "quantitie",
        //     key: "quantitie",
        //     width: 160,
        //     className: 'column-number-right ', // 靠右对齐
        //     render: (text, record, index) => {
        //         return <FactoryComp
        //             type='quantitie'//物料数量业务组件类型
        //             value={text}//初始化值
        //             field='quantitie'//修改的字段
        //             index={index}//字段的行号
        //             // required={true}//必输项
        //             record={record}//记录集用于多字段处理
        //             onChange={this.changeAllData}//回调函数
        //             // onValidate={this.onValidate}//校验的回调
        //         />
        //     }
        // },
        {
            title: "小计",
            dataIndex: "total",
            key: "total",
            className: 'column-number-right ', // 靠右对齐
            width: 80,
        },
        {
            title: "工业说明",
            dataIndex: "practice",
            key: "practice",
            width: 100,
        },
        {
            title: "计算方法",
            dataIndex: "calculateRule",
            key: "calculateRule",
            width: 100,
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            fixed:"right",
            width: 60,
            render(text, record, index) {
                const _this=this;
                return (
                    <div className='operation-btn'>
                        <i size='sm' className='uf-del' onClick={() => {
                            _this.onClickCell(record)
                        }}></i>
                    </div>
                )
            }
        },

    ];


    render() {
        const _this = this;
        const {subjectObj,subjectModalObj} = _this.props;
        const {addSubModalVisible,showPopAlert}=_this.state;

        const paginationObj = {   // 分页
            horizontalPosition: "right",
            verticalPosition: 'bottom',
            activePage: subjectObj.pageIndex,//当前页
            total: subjectObj.total,//总条数
            items: subjectObj.totalPages,
            freshData: _this.freshData,
            onDataNumSelect: _this.onDataNumSelect,
            showJump:false,
            dataNum: 1,
        }

        return (
            <div className='subject'>
                <div className='table-header'>
                    <Button shape="border" colors="success" size="sm"
                            onClick={this.onCheckSubject}
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
                <Grid
                    id="===="
                    data={subjectObj.list}
                    rowKey={(r, i) => r.index}
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
                <SubjectModal
                    modalVisible={addSubModalVisible}
                    subjectModalObj={subjectModalObj}
                    onCloseModal={_this.onCloseModal}
                />
            </div>
        )
    }
}

export default Subject;
