import React, {Component} from "react";
import {actions} from "mirrorx";
import {Button, Table, FormControl, Modal} from "tinper-bee";
import Grid from "components/Grid";

import "bee-complex-grid/build/Grid.css";
import "bee-pagination/build/Pagination.css";
import "bee-table/build/Table.css";

class ReferModal extends Component{
    columns = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: 60,
            render(record, text, index) {
                return index + 1;
            }
        },
        {
            title: "部位名称",
            dataIndex: "ppPositionName",
            key: "ppPositionName",
            width: 150
        },
        {
            title: "部位小计",
            dataIndex: "partSubtotal",
            className: 'column-number-right ', // 靠右对齐
            key: "partSubtotal",
            width: 80,
        },
    ];

    render(){
        const {otherParts,showReferModal,closeModal} = this.props;
        const paginationObj = {
            // 分页
            // horizontalPosition: "right",
            verticalPosition: "none"
        };
        return(
            <Modal show={showReferModal} backdrop={true} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title> 其他所有部位 </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid
                    rowKey={(r, i) => r.id}
                    columns={this.columns}
                    data={otherParts}
                    paginationObj={paginationObj}
                    showFilterMenu={true} //是否显示行过滤菜单
                    multiSelect={false} //false 单选，默认多选
                    rowClassName={(record, index, indent) => {
                        return partIndex === index ? "selected" : "";
                    }}
                    // onRowClick={(record, index) => {
                    //     console.log(record)
                    //     actions.quote.updateState({partIndex: index, selectedPartId:record.id});
                    //     // 查询项目
                    //     const param={search_pid:record.id};
                    //     actions.quote.loadSubjectList(param); // 查询默认条件
                    // }}
                    getSelectedDataFunc={() => {}}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.onClickOK} colors="primary" style={{marginRight: 25}}>确认</Button>
                <Button onClick={ () => closeModal()} shape="border" >关闭</Button>
            </Modal.Footer>
        </Modal>
           
        )
    }
}

export default ReferModal;