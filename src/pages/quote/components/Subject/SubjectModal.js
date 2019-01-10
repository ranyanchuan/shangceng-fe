import React, {Component} from "react";
import {Modal,Icon} from "tinper-bee";
import {actions} from "mirrorx";

import Button from 'components/Button';
import Grid from 'components/Grid';
import Form from 'bee-form';
import './index.less'

import 'bee-complex-grid/build/Grid.css';
import 'bee-pagination/build/Pagination.css'
import 'bee-table/build/Table.css';
import FactoryComp from "./FactoryComp";

class SubjectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectData:[],
        }
    }

    async componentWillReceiveProps(nextProps) {
        const {modalVisible} = this.props;
        const {modalVisible: nextModalVisible} = nextProps;
        if (nextModalVisible && modalVisible  !== nextModalVisible) {

        }
    }

    getSelectedDataFunc=(selectData)=>{
        this.setState({ selectData });
    }

    onClickOK=()=>{
     const {selectData}=this.state;
     console.log("===",selectData);
     this.onClickClose();
    }

    onClickClose=()=>{
        const {onCloseModal}=this.props;
        onCloseModal();
    }

    detailColumn = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 60,
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
            width: 80,
        },
        {
            title: "单位",
            dataIndex: "unit",
            key: "unit",
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

    ];

    render() {

        let _this = this;
        const { modalVisible,subjectModalObj} = _this.props;
        const paginationObj = {   // 分页
            horizontalPosition: "left",
            verticalPosition: 'bottom',
            activePage: subjectModalObj.pageIndex,//当前页
            total: subjectModalObj.total,//总条数
            items: subjectModalObj.totalPages,
            freshData: _this.freshData,
            onDataNumSelect: _this.onDataNumSelect,
            showJump:false,

        }
        return (
            <Modal show={modalVisible } size='lg' onHide={ this.onClickClose }>
                <Modal.Header closeButton>
                    <Modal.Title >项目名称</Modal.Title>
                </Modal.Header >
                <Modal.Body >
                    <Grid
                        data={subjectModalObj.list}
                        rowKey={(r, i) => r.index}
                        columns={this.detailColumn}
                        paginationObj={paginationObj}
                        getSelectedDataFunc={this.getSelectedDataFunc}
                        showHeaderMenu={false}
                        columnFilterAble={false}
                        emptyText={() => <Icon style={{"fontSize": "60px"}} type="uf-nodata"/>}
                        shouJump={false}
                        // loading={{ show: (!showLoading && showDetailLoading), loadingType: "line" }}
                    />
                </Modal.Body>
                <Modal.Footer className="footer">
                    <Button onClick={ this.onClickClose } shape="border" style={{marginRight: 25}}>关闭</Button>
                    <Button onClick={ this.onClickOK } colors="primary">确认</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Form.createForm()(SubjectModal);
